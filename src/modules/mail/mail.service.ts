import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly logger = new Logger(MailService.name);

  public sendMail(mailOptions: ISendMailOptions): void {
    this.mailerService
      .sendMail(mailOptions)
      .then((r) => {
        this.logger.log(`MAIL SENT SUCCESSFULLY! `);
      })
      .catch((reason) => {
        this.logger.error(`MAIL SENT FAIL! ${JSON.stringify(reason)}`);
      });
  }
}
