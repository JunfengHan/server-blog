import { Module } from '@nestjs/common';

// 各功能模块
import { ConfigModule } from './config/config.module';
import { DatabaseModule} from './database/database.module'; // 数据功能模块
import { ArticleModule } from './modules/article/article.module'; // 文章模块
import { UserModule } from './modules/user/user.module';  // 用户模块

// 各路由模块
import { AppController } from './app.controller';
import { ArticleController } from './controller/article/article.controller';

// provider
import { AppService } from './app.service';
import { ArticleService } from './controller/article/article.service';
import { SchemaHandler } from './provider/schema-handler';

/*
 * @Module 装饰器的类，为Nest组织应用程序结构提供了元数据
 * imports: 导入功能模块，Nest会自动注册他们导出的 provider
 * providers: Nest 实例化的提供者集合
 * controlers: 控制器
 */
@Module({
  imports: [ ConfigModule, DatabaseModule, UserModule, ArticleModule ],
  providers: [ AppService, ArticleService, SchemaHandler ],
  controllers: [ AppController, ArticleController ],
})
// AppModule 为跟模块，所有的功能模块都要导入进来
export class AppModule {}
