import { SchedulingDTO } from '@architecture/dtos/schedulings/SchedulingDTO';
import { SchedulingTimes } from '@architecture/dtos/schedulings/SchedulingTimes';
import { DocumentXLSX } from '../document.xlsx';

type DayWeekSigle = 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';

export interface IHorariosDocument {
  build();
}

export class HorariosXLSX implements IHorariosDocument {
  private document: DocumentXLSX;
  private schedulings: SchedulingDTO;

  constructor(schedulings: SchedulingDTO) {
    this.document = new DocumentXLSX();
    this.schedulings = schedulings;
  }

  public build() {
    const sheet = this.document.addWorksheet('Agendamentos');
    this.document.addHeaders(sheet, [
      { header: 'Dias da Semana', key: 'daysWeek', width: 'Dias da Semana'.length + 5 },
      { header: 'Horarios', key: 'scheduling', width: '08:00 as 12:00 - 13:00 as 18:00'.length + 5 },
    ]);
    this.document.addRows(sheet, this.makeRows());

    return this.document;
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
