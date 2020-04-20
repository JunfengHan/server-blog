/*
 * Mongodb 数据库连接
 */
import { createConnection } from 'typeorm';
import { Logger } from '@nestjs/common';
import { BussConf } from '../config/buss-conf';
const logger = new Logger('connection.provider');

export const MongoConnection = {
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