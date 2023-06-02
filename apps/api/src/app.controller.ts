import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/kickstart')
  kickstart() {
    return this.appService.kickstart();
  }
  @Get('/health')
  health() {
    return this.appService.health();
  }
  @Get()
  hello() {
    return this.appService.hello();
  }
}
