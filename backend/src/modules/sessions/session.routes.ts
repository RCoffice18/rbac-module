import { Router } from "express";
import { sessionController } from "./session.module";
import endpoints from "../../config/endpoints";
import { authenticateJWT } from "../../passports/jwt.passport";

const sessionRoutes = Router();

sessionRoutes.get(
  endpoints.v1.SESSIONS.getAll,
  authenticateJWT,
  sessionController.getAllSession
);
sessionRoutes.get(
  endpoints.v1.SESSIONS.get,
  authenticateJWT,
  sessionController.getSession
);
sessionRoutes.delete(
  endpoints.v1.SESSIONS.delete,
  authenticateJWT,
  sessionController.deleteSession
);

export default sessionRoutes;
