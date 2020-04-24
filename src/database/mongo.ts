// 定义 mongo 基本查询方法
import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { Connection, MongoEntityManager, MongoRepository } from 'typeorm';
import { SessionDto } from '../dto';

@Injectable()
export class Mongo implements OnApplicationShutdown {
	logger = new Logger(Mongo.name);
	onApplicationShutdown(sig: string) {
		this.logger.log('Application Showdown; Mongo Close');
		this.connection.close();
	}

	constructor(
		@Inject('MONGO_CONNECTION')
		readonly connection: Connection
	) {}

	GetModel(entity: any): MongoRepository<any> {
		return this.connection.getMongoRepository(entity);
	}

	GetManager(): MongoEntityManager {
		return this.connection.mongoManager;
	}

	async save(entity: any, UserSession?: SessionDto): Promise<any> {
		const isNew = !entity._id;
		if (UserSession) {
			if (isNew && !('IsDeleted' in entity)) {
				entity.IsDeleted = false;
				entity.CreateUserId = UserSession.UserId;
			} else {
				entity.UpdateUserId = UserSession.UserId;
			}
		}
		
		return this.connection.mongoManager.save(entity);
	}

	// 提供简单的API
	async findOne(entity: any, options: any): Promise<any> {
		const manager = this.GetManager();
		return manager.findOne(entity, options);
	}

	// 提供简单的API
	async find(entity: any, options: any): Promise<any> {
		const manager = this.GetManager();
		return manager.find(entity, options);
	}

	// 提供简单的API
	async count(entity: any, options: any): Promise<any> {
		const manager = this.GetManager();
		return manager.count(entity, options);
	}

	// 提供简单的API
	async aggregate(entity: any, options: any): Promise<any> {
		const manager = this.GetManager();
		return manager.aggregate(entity, options).toArray();
	}

	// 提供简单的API
	async update(entity: any, options: any, partEntity: any): Promise<any> {
		const manager = this.GetManager();
		return manager.update(entity, options, partEntity);
	}

	async remove(entity: any): Promise<any> {
		return await this.connection.mongoManager.remove(entity);
	}
}
