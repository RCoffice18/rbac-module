import SessionModel from "../../db/models/session.model";
import UserModel from "../../db/models/user.model";
import VerificationModel from "../../db/models/verification.model";
import { ErrorCode } from "../../helpers/enums/errors.enum";
import { VerificationEnum } from "../../helpers/enums/verify.enum";
import {
  ILoginUser,
  IRegisterUser,
  IResetPassword,
} from "../../helpers/interface";
import {
  BadRequestException,
  HttpException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "../../utils/CatchError";
import {
  anHourFromNow,
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
  threeMinutesAgo,
} from "../../utils/Date";
import {
  refreshTokenSignOptions,
  signJwtToken,
  verifyJwtToken,
} from "../../utils/jwt";
import { TRefreshPayload } from "../../helpers/types";
import { config } from "../../config/app.config";
import { sendEmail } from "../../mailers/sendMail";
import { verifyEmailTemplate } from "../../mailers/templates/verifyEmail.template";
import endpoints from "../../config/endpoints";
import { passwordResetTemplate } from "../../mailers/templates/passwordReset.template";
import { HTTPSTATUS } from "../../config/http.config";
import { encryptData } from "../../utils/bcrypt";

export class AuthService {
  public async register(data: IRegisterUser) {
    const { username, email, password } = data;

    const existingUser = await UserModel.exists({
      email,
    });

    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({
      username,
      email,
      password,
    });

    const userId = newUser._id;

    const verification = await VerificationModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    // Sending verification email link
    const verificationUrl = `${endpoints.v1.AUTH.confirmAccount}?code=${verification.code}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verificationUrl, "BC-CRM"),
    });

    return {
      user: newUser,
    };
  }

  public async login(data: ILoginUser) {
    const { email, password, userAgent } = data;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.INVALID_INPUT
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.INVALID_INPUT
      );
    }

    // check if the user enable 2fa return [user = null]
    if (user.userPreference.enable2FA) {
      return {
        user: null,
        mfaRequired: true,
        accessToken: "",
        refreshToken: "",
      };
    }

    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session._id,
      },
      refreshTokenSignOptions
    );

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    };
  }

  public async refreshToken(refreshToken: string) {
    const { payload } = verifyJwtToken<TRefreshPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException("Session does not exist");
    }

    if (session.expiresAt.getTime() <= now) {
      throw new UnauthorizedException("Session expired");
    }

    const sessionRequiredRefresh =
      session.expiresAt.getTime() - now <= ONE_DAY_IN_MS;

    if (sessionRequiredRefresh) {
      session.expiresAt = calculateExpirationDate(
        config.JWT.REFRESH_EXPIRES_IN
      );
      await session.save();
    }

    const newRefreshToken = sessionRequiredRefresh
      ? signJwtToken({ sessionId: session._id }, refreshTokenSignOptions)
      : undefined;

    const accessToken = signJwtToken({
      userId: session._id,
      sessionId: session._id,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }

  public async verifyEmail(code: string) {
    const validCode = await VerificationModel.findOne({
      code: code,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      validCode.userId,
      { isEmailVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      throw new BadRequestException(
        "Unable to verify email address",
        ErrorCode.VALIDATION_FAILED
      );
    }

    await validCode.deleteOne();

    return {
      user: updatedUser,
    };
  }

  public async forgotPassword(email: string) {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    //check mail rate limit is 2 emails per 3 or 10 min
    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await VerificationModel.countDocuments({
      userId: user._id,
      type: VerificationEnum.PASSWORD_RESET,
      createdAt: { $gt: timeAgo },
    });

    if (count >= maxAttempts) {
      throw new HttpException(
        "Too many request, try again later",
        HTTPSTATUS.TOO_MANY_REQUESTS,
        ErrorCode.AUTH_TOO_MANY_ATTEMPTS
      );
    }

    const expiresAt = anHourFromNow();
    const validCode = await VerificationModel.create({
      userId: user._id,
      type: VerificationEnum.PASSWORD_RESET,
      expiresAt,
    });

    const resetLink = `${config.APP_ORIGIN}/reset-password?code=${
      validCode.code
    }&exp=${expiresAt.getTime()}`;

    const emailResponse = await sendEmail({
      to: user.email,
      ...passwordResetTemplate(resetLink, "BC-CRM"),
    });

    if (!emailResponse.messageId) {
      throw new InternalServerException("Failed to send password reset email");
    }

    return {
      url: resetLink,
      emailId: emailResponse.messageId,
    };
  }

  public async resetPassword({ password, verificationCode }: IResetPassword) {
    const validCode = await VerificationModel.findOne({
      code: verificationCode,
      type: VerificationEnum.PASSWORD_RESET,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new NotFoundException("Invalid or expired verification code");
    }

    const hashedPassword = await encryptData(password);

    const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new BadRequestException("Failed to reset password!");
    }

    await validCode.deleteOne();

    await SessionModel.deleteMany({
      userId: updatedUser._id,
    });

    return {
      user: updatedUser,
    };
  }

  public async logout(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId);
  }
}
