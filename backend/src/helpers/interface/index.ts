import { TDepartment, TFileType, TResource, TRole } from "../types";

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

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: TRole[];
  isActive: boolean;
  department: TDepartment[];
  phoneNo: string;
  address: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginUser {
  username?: string;
  email?: string;
  password: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  hasAgreedToTerms: boolean;
}
