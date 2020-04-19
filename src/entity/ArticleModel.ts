import { Column, ObjectIdColumn} from "typeorm";
import { BaseEntity } from './Base';
import { ENTITY_STATUS } from './enum';

export class ArticleModelEntity extends BaseEntity{
	@ObjectIdColumn()
	_id: number;
	
	@Column()
	PrimaryId: number;
	
	@Column()
	IsDeleted: boolean; // 是否软删
	
	@Column()
	CreateUserId: number; // 创建者ID
	
	@Column()
	UpdateUserId: number; // 更新者ID
	
	@Column()
	DeleteUserId: number; // 删除者ID
	
	@Column()
	DeleteTime: number;
	
	@Column({
		type: "enum",
		enum: ENTITY_STATUS,
		default: ENTITY_STATUS.NORMAL
	})
	Status: ENTITY_STATUS;
	
	OldData: string;
}