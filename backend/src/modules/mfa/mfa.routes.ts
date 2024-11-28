import { Router } from "express";
import { authenticateJWT } from "../../passports/jwt.passport";
import { mfaController } from "./mfa.module";
import endpoints from "../../config/endpoints";

const mfaRoutes = Router();

mfaRoutes.get(
  endpoints.v1.MFA.setup,
  authenticateJWT,
  mfaController.generateMFASetup
);
mfaRoutes.post(
  endpoints.v1.MFA.verifySetup,
  authenticateJWT,
  mfaController.verifyMFASetup
);
mfaRoutes.put(
  endpoints.v1.MFA.revoke,
  authenticateJWT,
  mfaController.revokeMFA
);

mfaRoutes.post(endpoints.v1.MFA.verifyLogin, mfaController.verifyMFAForLogin);

export default mfaRoutes;
