import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';
import { SchemaHandler } from 'src/provider/schema-handler';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, DatabaseModule, SchemaHandler],
  exports: [ SchemaHandler ]
})
export class UserModule {}
