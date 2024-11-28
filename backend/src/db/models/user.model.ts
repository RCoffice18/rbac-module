import mongoose, { Schema } from "mongoose";
import { IUser, IUserPreferences } from "../../helpers/interface";
import { compareData, encryptData } from "../../utils/bcrypt";

const userPreferencesSchema = new Schema<IUserPreferences>({
  enable2FA: { type: Boolean, default: false },
  emailNotification: { type: Boolean, default: false },
  twoFactorSecret: { type: String, required: false },
});

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: [String],
      enum: ["USER", "ADMIN", "EDITOR"],
      default: ["USER"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    department: {
      type: [String],
      default: [],
    },
    userPreference: { type: userPreferencesSchema, default: {} },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password; // Remove sensitive data
        delete ret.userPreference?.twoFactorSecret;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await encryptData(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return compareData(value, this.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
