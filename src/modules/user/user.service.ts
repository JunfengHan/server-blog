import { Injectable } from '@nestjs/common';
import { Mongo } from '../../database/mongo';
import { UserEntity } from '../../entity/User';

@Injectable()
export class UserService {
  constructor( readonly mongo: Mongo ) {}

  async getUser(data: {_id: number}) {
    const id = data._id;
    const result = this.mongo.find(UserEntity, {
      where: {
        _id: id
      }
    });

    return result;
  }
}
