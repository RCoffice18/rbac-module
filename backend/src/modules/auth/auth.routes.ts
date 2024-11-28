import { Router } from "express";
import { authController } from "./auth.module";
import endpoints from "../../config/endpoints";
import { authenticateJWT } from "../../passports/jwt.passport";

const authRoutes = Router();

authRoutes.post(endpoints.v1.AUTH.register, authController.register);
authRoutes.post(endpoints.v1.AUTH.login, authController.login);

authRoutes.post(endpoints.v1.AUTH.verifyEmail, authController.verifyEmail);
authRoutes.post(endpoints.v1.AUTH.forgetPassword, authController.forgotPassword);
authRoutes.post(endpoints.v1.AUTH.resetPassword, authController.resetPassword);
authRoutes.post(endpoints.v1.AUTH.logout, authenticateJWT, authController.logout);

authRoutes.post(endpoints.v1.AUTH.refreshToken, authController.refreshToken);

export default authRoutes;
