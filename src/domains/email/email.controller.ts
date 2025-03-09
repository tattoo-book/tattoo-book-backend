import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WellcomePayloadDTO } from './dtos/wellcome-payload.dto';

@Controller()
export class EmailController {
  private static readonly logger = new Logger('EmailController');

  @MessagePattern('wellcome')
  wellcome(@Payload() payload: WellcomePayloadDTO) {
    EmailController.logger.log('Receive message wellcome, payload: ', payload);
  }
}
