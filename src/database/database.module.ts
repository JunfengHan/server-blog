/*
 * 数据功能模块集合
 */
import { HttpModule, Module } from '@nestjs/common';
import { Mongo } from './mongo';
import { MongoConnection } from './connection.provider';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ HttpModule, ConfigModule],
  providers: [
    Mongo,
    MongoConnection,
  ],
  exports: [
    Mongo,
    MongoConnection,
    "MONGO_CONNECTION",
  ]
})
export class DatabaseModule {
}