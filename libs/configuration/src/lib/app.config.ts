import { IsNumber } from 'class-validator';

export class AppConfiguration {
  @IsNumber()
  PORT: number;

  constructor() {
    this.PORT = Number(process.env['PORT']) || 3300;
  }
}

export const APP_CONFIGURATION = new AppConfiguration();

export type TypeAppConfiguration = typeof APP_CONFIGURATION;
