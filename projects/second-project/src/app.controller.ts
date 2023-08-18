import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('hello')
  getHello(): object {
    return {
      message: 'Hello World!'
    }
  }
}
