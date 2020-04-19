import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ArticleController } from './controller/article/article.controller';
import { ArticleService } from './controller/article/article.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
