import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 数据功能模块
import { DatabaseModule} from './database/database.module';
import { ArticleController } from './controller/article/article.controller';
import { ArticleService } from './controller/article/article.service';
import { UserModule } from './modules/user/user.module';
import { SchemaHandler } from './provider/schema-handler';

/*
 * @Module 装饰器的类，为Nest组织应用程序结构提供了元数据
 * import: 导入的功能模块并注册
 * exports: 导出共享模块，每个共享模块都可以访问 providers
 */
@Module({
  imports: [ DatabaseModule, UserModule ],
  controllers: [AppController, ArticleController],
  providers: [ AppService, ArticleService, SchemaHandler, DatabaseModule ],
})
// AppModule 为跟模块，所有的功能模块都要导入进来
export class AppModule {}
