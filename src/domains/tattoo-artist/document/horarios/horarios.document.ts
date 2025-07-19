import { BadRequestException } from '@nestjs/common';
import { SchedulingDTO } from 'src/domains/tattoo-artist/dtos/scheduling.dto';
import { HoursTXT } from './horarios.txt';
import { HoursXLSX } from './horarios.xlsx';

export type HoursFileType = 'xlsx' | 'txt';

export class ScheduleDocument {
  public static create(type: HoursFileType, schedules: SchedulingDTO) {
    if (type == 'xlsx') return new HoursXLSX(schedules);
    if (type == 'txt') return new HoursTXT(schedules);
    throw new BadRequestException(`File type invalid. Accept type: xlsx and txt`);
  }
}
