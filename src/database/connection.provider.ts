/*
 * Mongodb 数据库连接
 */
import { createConnection } from 'typeorm';
import { Logger, Module } from '@nestjs/common';
import { BussConf } from '../config/buss-conf';
const logger = new Logger('connection.provider');

// 工厂提供者，useFactory 语法允许根据参数动态创建provider
const mongoConnection = {
  provide: "MONGO_CONNECTION",
  useFactory: async (conf: BussConf) => {
    const conn = await createConnection({
      type: 'mongodb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      url: conf.GetMongoUri(),
      entities: [
        __dirname + '/../entity/*{.ts,.js}'
      ],
      synchronize: true,
    });

    if (conn.isConnected) {
      logger.log(`Mongo Connect Success`);
    } else {
      logger.error(`Mongo Connect Error`);
    }

    return conn;
  },
  inject: [BussConf]
}

@Module({
  providers: [ mongoConnection ],
  exports: [ 'MONGO_CONNECTION' ],
})
export class MongoConnection {}