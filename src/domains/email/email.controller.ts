import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WellComePayloadDTO } from './dtos/well-come-payload.dto';

@Controller()
export class EmailController {
  private static readonly logger = new Logger('EmailController');

  @MessagePattern('well-come')
  wellCome(@Payload() payload: WellComePayloadDTO) {
    EmailController.logger.log('Receive message well come, payload: ', payload);
  }
}
