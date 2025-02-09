import { SchedulingDTO } from '@architecture/dtos/schedulings/SchedulingDTO';
import { BadRequestException } from '@nestjs/common';
import { HorariosTXT } from './horarios.txt';
import { HorariosXLSX } from './horarios.xlsx';

export type HorariosFileType = 'xlsx' | 'txt';

export class HorariosDocument {
  public static create(type: HorariosFileType, schedulings: SchedulingDTO) {
    if (type == 'xlsx') return new HorariosXLSX(schedulings);
    if (type == 'txt') return new HorariosTXT(schedulings);
    throw new BadRequestException(`File type invalid. Accept type: xlsx and txt`);
  }
}
