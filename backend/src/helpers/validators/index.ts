import { z } from "zod";

// Email validation schema
export const emailSchema = z.string().trim().email().min(1).max(255);

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");
// Verification Code Validation schema
export const verificationCodeZSchema = z.string().trim().min(1).max(25);

export const registerSchema = z
  .object({
    username: z.string().trim().min(3).max(255),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const verificationEmailSchema = z.object({
  code: verificationCodeZSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeZSchema,
});

export const verifyMfaSchema = z.object({
  code: z.string().trim().min(1).max(6),
  secretKey: z.string().trim().min(1),
});

export const verifyMfaForLoginSchema = z.object({
  code: z.string().trim().min(1).max(6),
  email: z.string().trim().email().min(1),
  userAgent: z.string().optional(),
});
