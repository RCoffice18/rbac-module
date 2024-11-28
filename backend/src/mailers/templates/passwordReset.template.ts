export const passwordResetTemplate = (
  url: string,
  appName: string,
  brandColor: string = "#2563EB"
) => ({
  subject: "Reset Your Password",
  text: `To reset your password, please click the following link: ${url}`,
  html: `<html><head><style>body,html{margin:0;padding:0;font-family:'Arial',sans-serif;background-color:#f4f4f4;color:#333}.container{max-width:600px;margin:40px auto;padding:20px;background:#fff;border-radius:12px;box-shadow:0px 8px 16px rgba(0,0,0,0.1);overflow:hidden}.header{background-color:${brandColor};color:white;padding:30px;text-align:center;font-size:28px;font-weight:bold}.content{padding:30px;text-align:center}.content h1{font-size:22px;margin-bottom:15px;color:#333}.content p{font-size:16px;color:#666;line-height:1.5;margin-bottom:30px}.button{display:inline-block;padding:14px 28px;font-size:16px;font-weight:bold;background-color:${brandColor};color:white;border-radius:8px;text-decoration:none;transition:background-color 0.3s}.button:hover{background-color:#1e4db7}.footer{margin-top:20px;font-size:14px;color:#999;text-align:center}</style></head><body><div class="container"><div class="header">${appName}</div><div class="content"><h1>Reset Your Password</h1><p>We received a request to reset your password. Click the button below to create a new password.</p><a href="${url}" class="button">Reset Password</a><p>If you did not request a password reset, please ignore this email.</p></div><div class="footer"><p>If you have any questions, contact our support team at support@${appName}.com.</p></div></div></body></html>`,
});
