import { Injectable } from '@nestjs/common';
import { Mongo } from '../../database/mongo';
import { SchemaHandler } from 'src/provider/schema-handler';
import { UserEntity } from '../../entity/User';
import { BLOGException } from '../../exception/blog-exception.filter';

@Injectable()
export class UserService {
  // 注入依赖，在 userModule 里已经实例化
  constructor( 
    readonly mongo: Mongo,
    readonly schemaHandle: SchemaHandler
  ) {}

  async Add(data): Promise<any> {
    console.log('req_data:', data);
    const record = new UserEntity();
    // 注册
    if (data.actionType === 'signUp') {
      await this.setData(data, record, {});
      const result = this.mongo.save(record);
      return Promise.resolve(result);
    }

    // 登录
    if (data.actionType === 'login') {
      const result = {
        success: true,
        Name: ''
      };

      if (data.email && data.password) {
        const record = await this.mongo.findOne(UserEntity, { Name: data.email });

        console.log('login_record:', record);
        if (!record._id) {
          throw new BLOGException(12204, null, [String(record.Email)]);
        }

        // 验证用户名和登陆密码
        if (record.password !== data.Password) {
          throw new BLOGException(12202, null, [String(data.Email)])
        } else {
          result.Name = record.Name;
          result.success = true;
        }
        
        return Promise.resolve(result);
      }
    }
  }

  private async setData(data, record: UserEntity, session: any): Promise<void> {
		if (data.email) {
      record.Name = data.email.trim();
      record.Email = data.email.trim();
    }

    if (data.password) {
      record.Password = data.password;
    }

    if (data.phone) {
      record.Phone = data.phone;
    }

    const where = {} as any;
    if (data._id) {
      where._id = {$ne: data._id}
    }

    await this.schemaHandle.CheckNameExists(record.Name, UserEntity, where);
  }

  async GetUser(data): Promise<UserEntity> {
    const result = this.mongo.find(UserEntity, data);

    return result;
  }
}
