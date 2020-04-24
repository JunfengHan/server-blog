import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Mongo } from '../../database/mongo';

@Module({
  imports: [Mongo],
  controllers: [UserController],
  providers: [UserService, Mongo]
})
export class UserModule {}
