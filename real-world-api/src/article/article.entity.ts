import { UserEntity } from "@app/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'articles' })
export class ArticleEntity {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	slug: string;

	@ApiProperty()
	@Column()
	title: string;

	@ApiProperty()
	@Column({ default: '' })
	description: string;

	@ApiProperty()
	@Column({ default: '' })
	body: string;

	@ApiProperty()
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@ApiProperty()
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@ApiProperty()
	@Column('simple-array')
	tagList: string[];

	@ApiProperty()
	@Column({ default: 0 })
	favoritesCount: number;

	@BeforeUpdate()
	updateTimestamp() {
		this.updatedAt = new Date();
	}

	@ApiProperty({ type: () => UserEntity })
	@ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
	author: UserEntity;

}