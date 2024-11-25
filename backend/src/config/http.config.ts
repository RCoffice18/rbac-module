const httpConfig = () => ({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,

  AUTHENTICATION_SUCCESS: 210,

  DATA_VALIDATED: 220,

  RATE_LIMIT_SUCCESS: 230,

  SECURITY_CHECK_PASSED: 240,

  PAYMENT_SUCCESSFUL: 250,

  INTEGRATION_SUCCESSFUL: 260,

  GDPR_COMPLIANCE_SUCCESS: 270,

  FEATURE_ENABLED: 280,

  REPORT_GENERATED: 290,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  USER_ALREADY_EXISTS: 409,
  VALIDATION_FAILED: 422,
  LOCK_ERROR: 423,
  API_RATE_LIMIT_EXCEEDED: 429,
  SESSION_EXPIRED: 440,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  DISK_FULL: 507,
});

export const HTTPSTATUS = httpConfig();

export type HttpStatusCode = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS];