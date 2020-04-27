import { CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectID } from "typeorm";

export class BaseEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@CreateDateColumn()
	CreateTime: Date;
	
	@UpdateDateColumn()
	UpdateTime: Date;
}
