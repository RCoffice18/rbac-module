import mongoose, { Schema } from "mongoose";
import { ISession } from "../../helpers/interface";
import { thirtyDaysFromNow } from "../../utils/Date";

const sessionSchema = new Schema<ISession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  userAgent: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: thirtyDaysFromNow },
});

const SessionModel = mongoose.model<ISession>("Session", sessionSchema);
export default SessionModel;
