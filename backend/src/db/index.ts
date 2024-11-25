import mongoose from "mongoose";
import { config } from "../config/app.config";

const ConnectToDB = async () => {
  try {
    await mongoose.connect(config.DB.MONGOOSE.URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error Occured: Database Connection Failed");
    process.exit(1);
  }
};

export default ConnectToDB;