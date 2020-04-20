import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { join } from 'path';

const ENV_PATH = process.env.CONF_PATH || join(__dirname, '../../config/');
process.env.CONF_PATH = ENV_PATH;
const envFile = ENV_PATH + (process.env.CONF_FILE || 'data.env');

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(envFile),
    },
  ],
  exports: [EnvService]
})

export class ConfigModule {}