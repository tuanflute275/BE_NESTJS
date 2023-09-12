import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(private readonly mailerService: MailerService){}

  sendEmail(): void {
    this.mailerService.sendMail({
      to: 'rajni90@mailinator.com',
      from: 'rajni901@mailinator.com',
      subject: 'Tess nestjs',
      text: 'welcome',
      html: '<b>welcome</b>'
    })
  }
}
