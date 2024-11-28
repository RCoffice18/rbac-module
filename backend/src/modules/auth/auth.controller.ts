import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async.middleware";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationEmailSchema,
} from "../../helpers/validators";
import { SuccessCode } from "../../helpers/enums/success.enum";
import {
  clearAuthenticationCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookies,
} from "../../utils/cookies";
import { NotFoundException, UnauthorizedException } from "../../utils/CatchError";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // register
  public register = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = registerSchema.parse({
        ...req.body,
      });

      const { user } = await this.authService.register(body);
      return res.status(HTTPSTATUS.CREATED).json({
        message: SuccessCode.USER_REGISTERED,
        data: user,
      });
    }
  );
  // login
  public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userAgent = req.headers["user-agent"];
      const body = loginSchema.parse({
        ...req.body,
        userAgent,
      });

      const { user, accessToken, refreshToken, mfaRequired } =
        await this.authService.login(body);

      if (mfaRequired) {
        return res.status(HTTPSTATUS.OK).json({
          message: "Verify MFA authentication",
          mfaRequired,
          user,
        });
      }

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          message: "User login successfully",
          mfaRequired,
          user,
        });
    }
  );
  // refresh token
  public refreshToken = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const refreshToken = req.cookies.refreshToken as string | undefined;

      if (!refreshToken) {
        throw new UnauthorizedException("Missing refresh token");
      }

      const { accessToken, newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      if (newRefreshToken) {
        res.cookie(
          "refreshToken",
          newRefreshToken,
          getRefreshTokenCookieOptions()
        );
      }

      return res
        .status(HTTPSTATUS.OK)
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .json({
          message: "Refresh access token successfully",
        });
    }
  );
  // verify email
  public verifyEmail = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code } = verificationEmailSchema.parse(req.body);
      await this.authService.verifyEmail(code);
      return res.status(HTTPSTATUS.OK).json({
        message: "Email verified successfully",
      });
    }
  );
  // forget password
  public forgotPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const email = emailSchema.parse(req.body.email);
      await this.authService.forgotPassword(email);

      return res.status(HTTPSTATUS.OK).json({
        message: "Password reset email sent",
      });
    }
  );
  // reset password
  public resetPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = resetPasswordSchema.parse(req.body);

      await this.authService.resetPassword(body);

      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        message: "Reset Password successfully",
      });
    }
  );
  // logout
  public logout = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const sessionId = req.sessionId;
      if (!sessionId) {
        throw new NotFoundException("Session is invalid.");
      }
      await this.authService.logout(sessionId);
      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        message: "User logout successfully",
      });
    }
  );
}
