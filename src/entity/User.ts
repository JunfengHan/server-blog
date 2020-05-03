import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Base';
import { ENTITY_STATUS } from './enum';

@Entity("User")
export class UserEntity extends BaseEntity{
	@Column()
	Name: string;
	
	@Column()
	Phone: number;

	@Column()
	Password: string

	@Column()
	Email: string
	
	@Column({
		type: "enum",
		enum: ENTITY_STATUS,
		default: ENTITY_STATUS.NORMAL
	})
	Status: ENTITY_STATUS;
}
