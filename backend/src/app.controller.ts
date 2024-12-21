import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "<b>Hellow world2</b>";
  }
}