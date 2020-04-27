import { Injectable } from '@nestjs/common';
import { Mongo } from '../../database/mongo';
import { UserEntity } from '../../entity/User';

@Injectable()
export class UserService {
  constructor( readonly mongo: Mongo ) {}

  async Add(data): Promise<UserEntity> {
    const record = new UserEntity();
    await this.setData(data, record, {});
    const result = this.mongo.save(record); 

    return Promise.resolve(result);
  }

  private async setData(data, record: UserEntity, session: any): Promise<void> {
		if (data.name) {
			record.Name = data.name.trim();
    }

    if (data.phone) {
      record.Phone = data.phone;
    }
  }

  async GetUser(data): Promise<UserEntity> {
    const result = this.mongo.find(UserEntity, data);

    return result;
  }
}
