import { Controller, Body, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

// import {
//   ArticleAddMsgDto
// } from './article-dto';

@Controller('article')
export class ArticleController {
  constructor(readonly service: ArticleService) {}

  @Post('add')
  async getAdd(@Body() data: any): Promise<any> {
    const result = await this.service.Add(data.data);
    return Promise.resolve({
      data: result
    });
  }

}
