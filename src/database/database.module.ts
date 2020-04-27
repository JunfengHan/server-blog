/*
 * 数据功能模块集合
 */
import { HttpModule, Module } from '@nestjs/common';
import { Mongo } from './mongo';
import { DatabaseConnection } from './connection.provider';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ HttpModule, ConfigModule ],
  providers: [
    Mongo,
    DatabaseConnection,
  ],
  exports: [
    Mongo,
    DatabaseConnection,
  ]
})
export class DatabaseModule {
}