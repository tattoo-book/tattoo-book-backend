import { StreamableFile } from '@nestjs/common';

export class DocumentTXT {
  protected content: string;

  constructor() {}

  setContent(content: string) {
    this.content = content;
  }

  export() {
    const buffer = new TextEncoder().encode(this.content);
    return new StreamableFile(buffer, {
      type: 'text/plain',
      disposition: 'attachment; filename="document.txt"',
      length: buffer.length,
    });
  }
}
