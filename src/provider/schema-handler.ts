import { Inject, Injectable, Logger } from '@nestjs/common';
import { Mongo } from '../database/mongo';
import { BLOGException } from '../exception/blog-exception.filter';

@Injectable()
export class SchemaHandler {
	private readonly logger = new Logger(SchemaHandler.name);
	constructor(readonly mongo: Mongo) {}
	
	/**
	 * 检查名称是否已存在
	 * @param name 需要检查的名称
	 * @param entity 检查的数据库 Entity
	 * @param where 条件
	 * @param throwError 是否抛出错误
	 */
	async CheckNameExists(name: string, entity: any, where: {[key: string]: any}, throwError = true): Promise<boolean> {
		const record = await this.mongo.findOne(entity, {
			where: Object.assign({
				Name: name.trim(),
			}, where),
		});
		
		if (record && throwError) {
			throw new BLOGException(12203, null, [record._id]);
		}
		
		return !!record;
	}
}
