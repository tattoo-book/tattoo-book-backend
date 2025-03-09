import { Controller, Get } from '@nestjs/common';
import { JWT } from '@tattoo-book-architecture/decorators';
import { ResponseDTO } from '@tattoo-book-architecture/dtos';

@Controller()
export class AppController {
  @JWT(false)
  @Get('health-check')
  getHello(): ResponseDTO<null> {
    return ResponseDTO.OK('Health Check', null);
  }
}
