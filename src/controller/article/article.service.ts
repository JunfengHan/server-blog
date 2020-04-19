import { Injectable, Inject } from '@nestjs/common';
import { Mongo } from "../../database/mongo";
import { REQUEST } from '@nestjs/core';
import { Request } from "express";
import { ArticleEntity } from "../../entity/Article";
import { SchemaHandler } from '../../provider/schema-handler';

@Injectable()
export class ArticleService {
  constructor(
    readonly mongo: Mongo,
    readonly schemaHandle: SchemaHandler,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async Add(data): Promise<ArticleEntity> {
		// const UserSession: any = this.request.session.data;
		// const UserId = UserSession.UserId;

		// data.TdIds = [+UserId];

		const record = new ArticleEntity();
		await this.setData(data, record, {});
		const result = await this.mongo.save(record);
		return Promise.resolve(result);
  }
  
  private async setData(data, entity: ArticleEntity, session: any): Promise<void> {
		if (data.TdIds) {
			entity.TdIds = data.TdIds;
		}

		if (data.Name) {
			entity.Name = data.Name.trim();
			const where = {
				CreateUserId: session.UserId,
			} as any;
			
			if (data._id) {
				where._id = {$ne: data._id};
			}
			
			await this.schemaHandle.CheckNameExists(entity.Name, ArticleEntity, where);
		}
	}
}
