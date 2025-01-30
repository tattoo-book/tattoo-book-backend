import { SchedulingDTO } from '@architecture/dtos/schedulings/SchedulingDTO';
import { SchedulingTimes } from '@architecture/dtos/schedulings/SchedulingTimes';
import { DocumentTXT } from '../document.txt';
import { IHorariosDocument } from './horarios.xlsx';

export class HorariosTXT implements IHorariosDocument {
  private document: DocumentTXT;
  private schedulings: SchedulingDTO;

  private content = `DOM: 08:00 as 12:00 - 13:00 as 18:00\nSEG: 08:00 as 12:00 - 13:00 as 18:00\nTER: 08:00 as 12:00 - 13:00 as 18:00\n`;

  constructor(schedulings: SchedulingDTO) {
    this.document = new DocumentTXT();
    this.schedulings = schedulings;
  }

  build() {
    this.content = `DOM: ${this.formatHorarios(this.schedulings.sunday)}\n`;
    this.content += `SEG: ${this.formatHorarios(this.schedulings.monday)}\n`;
    this.content += `TER: ${this.formatHorarios(this.schedulings.tuesday)}\n`;
    this.content += `QUA: ${this.formatHorarios(this.schedulings.wednesday)}\n`;
    this.content += `QUI: ${this.formatHorarios(this.schedulings.thursday)}\n`;
    this.content += `SEX: ${this.formatHorarios(this.schedulings.friday)}\n`;
    this.content += `SAB: ${this.formatHorarios(this.schedulings.saturday)}\n`;
    this.document.setContent(this.content);
    return this.document;
  }

  private formatHorarios(times: SchedulingTimes[]) {
    let result = 'Fechado';

    times.forEach((sche, index) => {
      if (index == 0) result = sche.start + ' as ' + sche.end;
      else result += ', ' + sche.start + ' as ' + sche.end;
    });

    return result;
  }
}
