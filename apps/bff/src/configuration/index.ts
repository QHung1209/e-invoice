import { AppConfiguration } from '@common/configuration/app.config';
import { BaseConfiguration } from '@common/configuration/base.config';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class Configuration extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();

  constructor() {
    super();
  }
}

export const CONFIGURATION = new Configuration();

export type TypeConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();
