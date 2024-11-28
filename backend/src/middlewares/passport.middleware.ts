import passport from "passport";
import { setupJwtStrategy } from "../passports/jwt.passport";

const intializePassport = () => {
  setupJwtStrategy(passport);
};

intializePassport();

export default passport;
