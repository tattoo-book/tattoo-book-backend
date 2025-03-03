import { StreamableFile } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs';

export class DocumentXLSX {
  private workbook: Workbook;

  constructor() {
    this.workbook = new Workbook();
  }

  public addWorksheet(name: string) {
    return this.workbook.addWorksheet(name);
  }

  public addHeaders(sheet: Worksheet, data: any) {
    sheet.columns = data;
  }

  public addRows(sheet: Worksheet, data: any[]) {
    data.forEach((item) => sheet.addRow(item));
  }

  public async export() {
    const buffer = new Uint8Array(await this.workbook.xlsx.writeBuffer());
    return new StreamableFile(buffer, {
      type: 'application/json',
      disposition: 'attachment; filename="document.xlsx"',
      length: buffer.length,
    });
  }
}
