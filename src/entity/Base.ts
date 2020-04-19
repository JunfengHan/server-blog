import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
	@CreateDateColumn()
	CreateTime: Date;
	
	@UpdateDateColumn()
	UpdateTime: Date;
}
