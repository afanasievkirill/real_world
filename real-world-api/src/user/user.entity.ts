import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@app/article/article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	email: string;

	@ApiProperty()
	@Column()
	username: string;

	@ApiProperty()
	@Column({ default: '' })
	bio: string;

	@ApiProperty()
	@Column({ default: '' })
	image: string;

	@Column({ select: false })
	password: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10)
	}

	@OneToMany(() => ArticleEntity, article => article.author)
	articles: ArticleEntity[]

	@ManyToMany(() => ArticleEntity)
	@JoinTable()
	favorites: ArticleEntity[];
}