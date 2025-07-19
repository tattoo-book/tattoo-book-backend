import { SchedulingTimes } from 'src/domains/tattoo-artist/dtos/scheduling-times.dto';
import { SchedulingDTO } from 'src/domains/tattoo-artist/dtos/scheduling.dto';
import { DocumentTXT } from '../document.txt';

export class HorariosTXT extends DocumentTXT {
  private readonly schedulings: SchedulingDTO;

  constructor(schedulings: SchedulingDTO) {
    super();
    this.schedulings = schedulings;
  }

  public build() {
    this.content = `DOM: ${this.formatHorarios(this.schedulings.sunday)}\n`;
    this.content += `SEG: ${this.formatHorarios(this.schedulings.monday)}\n`;
    this.content += `TER: ${this.formatHorarios(this.schedulings.tuesday)}\n`;
    this.content += `QUA: ${this.formatHorarios(this.schedulings.wednesday)}\n`;
    this.content += `QUI: ${this.formatHorarios(this.schedulings.thursday)}\n`;
    this.content += `SEX: ${this.formatHorarios(this.schedulings.friday)}\n`;
    this.content += `SAB: ${this.formatHorarios(this.schedulings.saturday)}\n`;
    return this;
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
