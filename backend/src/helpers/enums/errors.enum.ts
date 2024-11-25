export const enum ErrorCode {
  AUTH_EMAIL_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_TOKEN = "INVALID_TOKEN",
  FORBIDDEN = "FORBIDDEN",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  NOT_FOUND = "NOT_FOUND",
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
  CONFLICT = "CONFLICT",
  CONSTRAINT_VIOLATION = "CONSTRAINT_VIOLATION",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  INVALID_INPUT = "INVALID_INPUT",
  LOCK_ERROR = "LOCK_ERROR",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
  API_RATE_LIMIT_EXCEEDED = "API_RATE_LIMIT_EXCEEDED",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  DATABASE_CONNECTION_ERROR = "DATABASE_CONNECTION_ERROR",
  QUERY_ERROR = "QUERY_ERROR",
  TRANSACTION_ERROR = "TRANSACTION_ERROR",
  CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
  DRIVER_ERROR = "DRIVER_ERROR",
  CACHE_WRITE_ERROR = "CACHE_WRITE_ERROR",
  CACHE_READ_ERROR = "CACHE_READ_ERROR",
  CACHE_INVALIDATION_ERROR = "CACHE_INVALIDATION_ERROR",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  INTEGRATION_ERROR = "INTEGRATION_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  BAD_GATEWAY = "BAD_GATEWAY",
  CONNECTION_RESET = "CONNECTION_RESET",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  DNS_LOOKUP_FAILED = "DNS_LOOKUP_FAILED",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
  TIMEOUT = "TIMEOUT",
  CACHE_TIMEOUT = "CACHE_TIMEOUT",
  DISK_FULL = "DISK_FULL",
}