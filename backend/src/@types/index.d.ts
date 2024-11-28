import { Request } from "express";
import { IUser } from "../helpers/interface";

declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request {
      sessionId?: string;
    }
  }
}
