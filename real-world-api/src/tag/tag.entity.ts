import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tags' })
export class TagEntity {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	name: string;
}

export class TagsResponce {

	@ApiProperty()
	tags: string[];
}

