import { Controller, Get } from '@nestjs/common';
import { JWT, ResponseDTO } from 'tattoo-book-architecture/libs/tattoo-book/src';

@Controller()
export class AppController {
  @JWT(false)
  @Get('health-check')
  getHello(): ResponseDTO<null> {
    return ResponseDTO.OK('Health Check', null);
  }
}
