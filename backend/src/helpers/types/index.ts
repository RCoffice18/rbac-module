import { ISession, IUser } from "../interface";

export type TAuth =
  | "LOGIN"
  | "REGISTER"
  | "LOGOUT"
  | "REFRESHTOKEN"
  | "RECONNECT";
export type TRole = "ADMIN" | "USER" | "MODERATOR";

export type TAccessPayload = {
  userId: IUser["_id"];
  sessionId: ISession["_id"];
};

export type TRefreshPayload = {
  sessionId: ISession["_id"];
};

export type TDepartment =
  | "IT"
  | "CUSTOMER_SUPPORT"
  | "HR"
  | "SALES"
  | "MARKETING"
  | "FINANCE"
  | "OPERATIONS"
  | "LEGAL"
  | "PRODUCT"
  | "ENGINEERING"
  | "DESIGN"
  | "QUALITY_ASSURANCE"
  | "ADMINISTRATION"
  | "RESEARCH";

export type TProject =
  | "CONSTRUCTION"
  | "SOFTWARE"
  | "MARKETING"
  | "EDUCATION"
  | "RESEARCH";

export type TResource =
  | "USER"
  | "MESSAGE"
  | "NOTIFICATION"
  | "TASK"
  | "PROJECT";

export type TDocument =
  | "BLUEPRINT"
  | "REPORT"
  | "INVOICE"
  | "CONTRACT"
  | "PRESENTATION";
  
export type TFileType =
  // Image extensions
  | "png"
  | "jpg"
  | "jpeg"
  // Document extensions
  | "pdf"
  | "docx"
  // Spreadsheet extensions
  | "txt"
  | "xls"
  | "xlsx"
  // Presentation extensions
  | "pptx"
  | "ppt"
  // Video extensions
  | "mp4"
  | "avi"
  | "mkv"
  // Audio extensions
  | "mp3"
  | "wav"
  // Archive extensions
  | "zip"
  | "rar"
  | string;

export type TMail = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};
