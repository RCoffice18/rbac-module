import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/AppError";
import { z } from "zod";
import { ErrorCode } from "../helpers/enums/errors.enum";
import { clearAuthenticationCookies } from "../utils/cookies";
import endpoints from "../config/endpoints";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: ErrorCode.VALIDATION_FAILED,
    errors: errors,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error("Error Occured:", {
    path: req.path,
    error,
  });

  // Catch the refresh-token
  if (req.path === endpoints.v1.AUTH.refreshToken) {
    clearAuthenticationCookies(res);
  }

  // Catch the Syntax Error
  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format, please check your request body.",
    });
  }

  // Catch the Zod Validation Error
  if (error instanceof z.ZodError) {
    return formatZodError(res, error);
  }

  // Catch the Application Error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: ErrorCode.INTERNAL_SERVER_ERROR,
    error: error?.message || ErrorCode.UNKNOWN_ERROR,
  });
};
