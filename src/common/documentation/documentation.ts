import { applyDecorators } from '@nestjs/common';

export function Documentation(...values: any[]) {
  return applyDecorators(...values);
}
