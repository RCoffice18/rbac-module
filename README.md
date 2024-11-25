# RBAC Module Setup

This guide walks you through initializing the packages required for setting up an RBAC (Role-Based Access Control) module.

## 1. Initialize the Packages

### Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install bcrypt cookie-parser cors date-fns-tz dotenv express jsonwebtoken mongoose passport passport-jwt qrcode resend speakeasy zod
```

### Install Dev Dependencies
Run the following command to install the necessary development dependencies:

```bash
npm install -D @types/bcrypt @types/cookie-parser @types/cors @types/dotenv @types/express @types/jsonwebtoken @types/mongoose @types/passport @types/passport-jwt @types/qrcode @types/speakeasy ts-node-dev typescript ts-jest
```