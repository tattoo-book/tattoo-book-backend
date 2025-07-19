import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

const hideLogs = true;

if (hideLogs) {
  jest.spyOn(Logger, 'log').mockImplementation(() => {});
  jest.spyOn(Logger, 'warn').mockImplementation(() => {});
  jest.spyOn(Logger, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
}

dotenv.config({ path: '.env.test' });
Logger.log('Loaded .env.test for Jest');
