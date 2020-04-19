import {Column, Entity} from "typeorm";
import { ArticleModelEntity } from "./ArticleModel";

@Entity("Article")
export class ArticleEntity extends ArticleModelEntity {
	@Column()
	Name: string;
	
	@Column()
	TdIds: number[];
}


