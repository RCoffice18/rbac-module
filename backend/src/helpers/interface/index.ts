import { Response } from "express";
import mongoose, { Document } from "mongoose";
import { TDepartment, TFileType, TResource, TRole } from "../types";
import { VerificationEnum } from "../enums/verify.enum";

export interface IResourceMetaData {
  resources: TResource[];
  action: "update" | "delete" | "create";
}

export interface IFileMetadata {
  fileName: string;
  action: "upload" | "delete" | "download";
  size: number;
  type: TFileType;
  timestamp: string;
}

export interface IUserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: TRole[];
  isEmailVerified: boolean;
  department: TDepartment[];
  createdAt: Date;
  updatedAt: Date;
  userPreference: IUserPreferences;
  comparePassword(value: string): Promise<boolean>;
}

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface IVerificationCode extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  expiresAt: Date;
  createdAt: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
  userAgent?: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
}

export interface IResetPassword {
  password: string;
  verificationCode: string;
}

export interface ICookiesPayload {
  res: Response;
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  userId: string;
  sessionId: string;
}
