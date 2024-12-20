const enum ErrorCode {
  // Authentication Errors
  AUTH_EMAIL_ALREADY_EXISTS = "AUTH_EMAIL_ALREADY_EXISTS",
  AUTH_INVALID_TOKEN = "AUTH_INVALID_TOKEN",
  AUTH_USER_NOT_FOUND = "AUTH_USER_NOT_FOUND",
  AUTH_NOT_FOUND = "AUTH_NOT_FOUND",
  AUTH_TOO_MANY_ATTEMPTS = "AUTH_TOO_MANY_ATTEMPTS",
  AUTH_UNAUTHORIZED_ACCESS = "AUTH_UNAUTHORIZED_ACCESS",
  AUTH_TOKEN_NOT_FOUND = "AUTH_TOKEN_NOT_FOUND",

  // Access Control Errors
  ACCESS_FORBIDDEN = "ACCESS_FORBIDDEN",
  ACCESS_UNAUTHORIZED = "ACCESS_UNAUTHORIZED",

  // Validation Errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  INVALID_INPUT = "INVALID_INPUT",

  // Resource Errors
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",

  // System Errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  VERIFICATION_ERROR = "VERIFICATION_ERROR",
  CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
  DRIVER_ERROR = "DRIVER_ERROR",
  QUERY_ERROR = "QUERY_ERROR",
  TRANSACTION_ERROR = "TRANSACTION_ERROR",
  DATABASE_CONNECTION_ERROR = "DATABASE_CONNECTION_ERROR",

  // Cache Errors
  CACHE_WRITE_ERROR = "CACHE_WRITE_ERROR",
  CACHE_READ_ERROR = "CACHE_READ_ERROR",
  CACHE_INVALIDATION_ERROR = "CACHE_INVALIDATION_ERROR",
  CACHE_TIMEOUT = "CACHE_TIMEOUT",

  // Locking and Concurrency
  LOCK_ERROR = "LOCK_ERROR",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",

  // API Errors
  API_RATE_LIMIT_EXCEEDED = "API_RATE_LIMIT_EXCEEDED",
  SESSION_EXPIRED = "SESSION_EXPIRED",

  // Conflict and Constraint Errors
  CONFLICT = "CONFLICT",
  CONSTRAINT_VIOLATION = "CONSTRAINT_VIOLATION",

  // HTTP Errors
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",

  // Timeout Errors
  TIMEOUT = "TIMEOUT",
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
  CONNECTION_RESET = "CONNECTION_RESET",
  DNS_LOOKUP_FAILED = "DNS_LOOKUP_FAILED",

  // Unexpected Errors
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR_OCCURED",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  INTEGRATION_ERROR = "INTEGRATION_ERROR",

  // Miscellaneous Errors
  DISK_FULL = "DISK_FULL",
}

export { ErrorCode };
