// import { Resend } from "resend";
import nodemailer from "nodemailer";
import { config } from "../config/app.config";

// export const resend = new Resend(config.RESEND.API_KEY);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GMAIL.USER,
    pass: config.GMAIL.PASS,
  },
});
