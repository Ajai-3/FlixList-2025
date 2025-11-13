import { injectable } from "inversify";
import nodemailer, { Transporter } from "nodemailer";
import { config } from "../../infrastructure/config/env";
import { IEmailService, EmailOptions } from "../../application/interfaces/services/IEmailService";

@injectable()
export class EmailService implements IEmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure, 
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  async sendMail({ to, subject, html }: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"${config.email.fromName}" <${config.email.fromAddress}>`,
        to,
        subject,
        html,
      });
    } catch (error: any) {
      console.error("Failed to send email:", error.message);
      throw new Error("Email sending failed");
    }
  }
}
