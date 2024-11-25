import mongoose, { Schema } from "mongoose";
import { IVerificationCode } from "../../helpers/interface";
import { generateUniqueCode } from "../../utils/uuid";

const verificationSchema = new Schema<IVerificationCode>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    default: generateUniqueCode,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationModel = mongoose.model<IVerificationCode>(
  "VerificationCode",
  verificationSchema,
  "verification_codes"
);
export default VerificationModel;
