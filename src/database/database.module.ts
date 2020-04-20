import { HttpModule, Module } from '@nestjs/common';
import { Mongo } from './mongo';
import { MongoConnection } from './connection.provider';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ HttpModule, ConfigModule],
  providers: [
    Mongo,
  ],
  exports: [
    Mongo,
  ]
})

export class DatabaseModule {
}