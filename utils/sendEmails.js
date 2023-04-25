import { transporter } from "../config/mailer.js";

export const sendEmails = async(username, subject, html) => {
  await transporter.sendMail({
    from: '"RAPPI SHOP" <rappishop@mail.com>',
    to: username,
    subject: subject,
    html: html
  });
}