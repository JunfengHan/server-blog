import { Injectable, Logger } from '@nestjs/common';
import { EnvService } from './env.service';
// import * as _ from 'lodash';

@Injectable()
export class BussConf {
  mongoUri: string;

  constructor(
    public env: EnvService
  ) {
    this.mongoUri = 'mongodb://{{USER}}:{{PASS}}@{{HOST}}/{{DB}}?replicaSet={{SET}}'
    .replace('{{USER}}', this.env.get("MONGO_USER"))
    .replace('{{PASS}}', this.env.get("MONGO_PASS"))
    .replace('{{HOST}}', this.env.get("MONGO_HOST"))
    .replace('{{DB}}', this.env.get("MONGO_DATABASE"))
    .replace('{{SET}}', this.env.get("MONGO_REPLICASET"));
  }

  GetMongoUri(): string {
		return this.mongoUri;
	}
}