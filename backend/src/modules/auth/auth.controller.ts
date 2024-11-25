import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async.middleware";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import { loginSchema, registerSchema } from "../../helpers/validators";
import { SuccessCode } from "../../helpers/enums/success.enum";

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

      await this.authService.login(body);
    }
  );
}
