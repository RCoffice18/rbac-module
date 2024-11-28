import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { config } from "../config/app.config";
import { TAccessPayload, TRefreshPayload } from "../helpers/types";

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["USER"],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN,
  secret: config.JWT.SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET,
};

export const signJwtToken = (
  payload: TAccessPayload | TRefreshPayload,
  options?: SignOptsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};

export const verifyJwtToken = <TPayload extends object = TAccessPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts,
    }) as TPayload;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};