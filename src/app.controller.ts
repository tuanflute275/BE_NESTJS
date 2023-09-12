import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Home')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  sendEmail(): void {
    return this.appService.sendEmail();
  }
}
