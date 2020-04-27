import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user-dto';
import { CreateUserMsgDto } from './user-dto';

@Controller('user')
export class UserController {
  constructor(readonly service: UserService) {}

  @Post()
  async add(@Body() data: CreateUserDto): Promise<any> {
    const result = await this.service.Add(data);
    return Promise.resolve({
      success: true,
      result: result
    });
  }

  @Get(':id')
  async getUser(@Req() data: any) : Promise<any> {
    console.log('data:', data);
    const result = await this.service.GetUser(data);
    return Promise.resolve({
      data: result
    });
  }
}
