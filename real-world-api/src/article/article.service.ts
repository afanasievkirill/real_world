import { UserEntity } from '@app/user/user.entity';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleResponceInterface } from './types/article-responce.interface';
import slugify from 'slugify';
import { NOT_AUTHOR_ERROR, NOT_FOUND_ARTICLE_ERROR } from './article.constants';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesResponceInterface } from './types/articles-responce.interface';

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) { }

	async findAll(currentUserId: number, query: any): Promise<ArticlesResponceInterface> {
		const queryBuilder = getRepository(ArticleEntity)
			.createQueryBuilder('articles')
			.leftJoinAndSelect('articles.author', 'author');

		queryBuilder.orderBy('articles.createdAt', 'DESC');

		const articlesCount = await queryBuilder.getCount();

		if (query.tag) {
			queryBuilder.andWhere('articles.tagList LIKE :tag', {
				tag: `%${query.tag}%`
			})
		}

		if (query.author) {
			const author = await this.userRepository.findOne({
				username: query.author
			})
			queryBuilder.andWhere('articles.authorId = :id', {
				id: author.id
			})
		};

		if (query.limit) { queryBuilder.limit(query.limit); };

		if (query.offset) { queryBuilder.offset(query.offset); };

		const articles = await queryBuilder.getMany();

		return { articles, articlesCount };

	}

	async createArticle(
		currnetUser: UserEntity,
		createArticleDto: CreateArticleDto
	): Promise<ArticleEntity> {
		const article = new ArticleEntity();
		Object.assign(article, createArticleDto);

		if (!article.tagList) {
			article.tagList = [];
		}

		article.slug = this.getSlug(createArticleDto.title)

		article.author = currnetUser;
		return await this.articleRepository.save(article);
	}

	async findArticleBySlug(slug: string): Promise<ArticleEntity> {
		const article = await this.articleRepository.findOne({ slug });
		if (!article) {
			throw new NotFoundException(NOT_FOUND_ARTICLE_ERROR)
		}
		return article;
	}

	async deleteArticleBySlug(currentUserId: number, slug: string): Promise<DeleteResult> {
		const article = await this.articleRepository.findOne({ slug });
		if (!article) {
			throw new NotFoundException(NOT_FOUND_ARTICLE_ERROR);
		}
		if (article.author.id != currentUserId) {
			throw new ForbiddenException(NOT_AUTHOR_ERROR);
		}
		return await this.articleRepository.delete({ slug });
	}

	async updateArticle(
		currentUserId: number,
		slug: string,
		updateArticleDto: UpdateArticleDto
	): Promise<ArticleEntity> {
		const article = await this.articleRepository.findOne({ slug });
		if (!article) {
			throw new NotFoundException(NOT_FOUND_ARTICLE_ERROR);
		}
		if (article.author.id != currentUserId) {
			throw new ForbiddenException(NOT_AUTHOR_ERROR);
		}
		Object.assign(article, updateArticleDto);
		return await this.articleRepository.save(article);
	}

	buildArticleResponce(article: ArticleEntity): ArticleResponceInterface {
		return { article };
	}

	private getSlug(title: string): string {
		return slugify(title, {
			lower: true,
		}) +
			'-' +
			((Math.random() * Math.pow(36, 6)) | 0).toString(36);
	}
}
