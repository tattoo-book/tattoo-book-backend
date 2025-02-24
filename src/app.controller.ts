import { JWT } from '@architecture/decorators/jwt';
import { Controller, Get } from '@nestjs/common';
import { ResponseDTO } from './architecture/dtos/ResponseDTO';

@Controller()
export class AppController {
  @JWT(false)
  @Get('health-check')
  getHello(): ResponseDTO<null> {
    return ResponseDTO.OK('Health Check', null);
  }
}
