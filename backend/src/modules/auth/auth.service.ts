import SessionModel from "../../db/models/session.model";
import UserModel from "../../db/models/user.model";
import VerificationModel from "../../db/models/verification.model";
import { ErrorCode } from "../../helpers/enums/errors.enum";
import { VerificationEnum } from "../../helpers/enums/verify.enum";
import { ILoginUser, IRegisterUser } from "../../helpers/interface";
import { BadRequestException } from "../../utils/CatchError";
import { fortyFiveMinutesFromNow } from "../../utils/Date";

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

    const verificationCode = await VerificationModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
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
        ErrorCode.INVALID_CREDENTIALS
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.INVALID_CREDENTIALS
      );
    }

    // check if the user enable 2fa return [user = null]
      const session = await SessionModel.create({
        userId: user._id,
        userAgent,
      }) 
  }
}
