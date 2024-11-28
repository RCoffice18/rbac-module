import { transporter } from "./nodemailer";
import { config } from "../config/app.config";
import { TMail } from "../helpers/types";

const mailer_sender =
  config.NODE_ENV === "development"
    ? `no-reply <rcoffice18@gmail.com>`
    : `no-reply <${config.GMAIL.USER}>`;

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: TMail) =>
  await transporter.sendMail({
    from,
    to: Array.isArray(to) ? to : [to],
    text,
    subject,
    html,
  });
