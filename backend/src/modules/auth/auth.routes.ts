import { Router } from "express";
import { authController } from "./auth.module";
import endpoints from "../../config/endpoints";

const authRoutes = Router();

authRoutes.post(endpoints.v1.AUTH.register, authController.register);

export default authRoutes;
