import { SchedulingTimes } from 'src/domains/tattoo-artist/dtos/scheduling-times.dto';
import { SchedulingDTO } from 'src/domains/tattoo-artist/dtos/scheduling.dto';
import { DocumentXLSX } from '../document.xlsx';

export class HoursXLSX extends DocumentXLSX {
  private readonly schedulings: SchedulingDTO;

  constructor(schedulings: SchedulingDTO) {
    super();
    this.schedulings = schedulings;
  }

  public build() {
    const sheet = this.addWorksheet('Agendamentos');
    this.addHeaders(sheet, [
      { header: 'Dias da Semana', key: 'daysWeek', width: 'Dias da Semana'.length + 5 },
      { header: 'Horarios', key: 'scheduling', width: '08:00 as 12:00 - 13:00 as 18:00'.length + 5 },
    ]);
    this.addRows(sheet, this.makeRows());
    return this;
  }

  private makeRows() {
    return [
      {
        daysWeek: 'DOM',
        scheduling: this.formatHorarios(this.schedulings.sunday),
      },
      {
        daysWeek: 'SEG',
        scheduling: this.formatHorarios(this.schedulings.monday),
      },
      {
        daysWeek: 'TER',
        scheduling: this.formatHorarios(this.schedulings.tuesday),
      },
      {
        daysWeek: 'QUA',
        scheduling: this.formatHorarios(this.schedulings.wednesday),
      },
      {
        daysWeek: 'QUI',
        scheduling: this.formatHorarios(this.schedulings.thursday),
      },
      {
        daysWeek: 'SEX',
        scheduling: this.formatHorarios(this.schedulings.friday),
      },
      {
        daysWeek: 'SAB',
        scheduling: this.formatHorarios(this.schedulings.saturday),
      },
    ];
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
