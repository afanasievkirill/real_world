import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { NOT_AUTHORIZED_ERROR } from '@app/user/user.constants';
import { UserEntity } from '@app/user/user.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NOT_AUTHOR_ERROR, NOT_FOUND_ARTICLE_ERROR } from './article.constants';
import { ArticleService } from './article.service';
import { ArticleResponce } from './dto/article.responce';
import { AppCreateArticleDto, CreateArticleDto } from './dto/create-article.dto';
import { AppUpdateArticleDto, UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponceInterface } from './types/article-responce.interface';
import { ArticlesResponceInterface } from './types/articles-responce.interface';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) { }

	@Get()
	async findAll(
		@User('id') currentUserId: number,
		@Query() query: any
	): Promise<ArticlesResponceInterface> {
		return await this.articleService.findAll(currentUserId, query);
	}

	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Return created article', type: ArticleResponce })
	@ApiUnauthorizedResponse({ description: NOT_AUTHORIZED_ERROR })
	@ApiBody({ type: AppCreateArticleDto })
	@UsePipes(new ValidationPipe())
	@UseGuards(AuthGuard)
	@Post()
	async createArticle(
		@User() currentUser: UserEntity,
		@Body('article') createArticleDto: CreateArticleDto
	): Promise<ArticleResponceInterface> {
		const article = await this.articleService.createArticle(currentUser, createArticleDto);
		return this.articleService.buildArticleResponce(article);
	}

	@ApiOkResponse({ description: 'Return article by slug', type: ArticleResponce })
	@ApiNotFoundResponse({ description: NOT_FOUND_ARTICLE_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@Get(':slug')
	async getArticleBySlug(@Param('slug') slug: string): Promise<ArticleResponceInterface> {
		const article = await this.articleService.findArticleBySlug(slug);

		return this.articleService.buildArticleResponce(article);
	}

	@ApiOkResponse({ description: 'Article is success update', type: ArticleResponce })
	@ApiUnauthorizedResponse({ description: NOT_AUTHORIZED_ERROR })
	@ApiNotFoundResponse({ description: NOT_FOUND_ARTICLE_ERROR })
	@ApiForbiddenResponse({ description: NOT_AUTHOR_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@UseGuards(AuthGuard)
	@ApiBody({ type: AppUpdateArticleDto })
	@Put(':slug')
	async updateArticle(
		@User('id') currentUserId: number,
		@Param('slug') slug: string,
		@Body('article') createArticleDto: UpdateArticleDto
	): Promise<ArticleResponceInterface> {
		const article = await this.articleService.updateArticle(currentUserId, slug, createArticleDto)
		return this.articleService.buildArticleResponce(article);
	}

	@ApiOkResponse({ description: 'Article is success delete' })
	@ApiUnauthorizedResponse({ description: NOT_AUTHORIZED_ERROR })
	@ApiNotFoundResponse({ description: NOT_FOUND_ARTICLE_ERROR })
	@ApiForbiddenResponse({ description: NOT_AUTHOR_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@UseGuards(AuthGuard)
	@Delete(':slug')
	async deleteArticle(
		@User('id') currentUserId: number,
		@Param('slug') slug: string
	) {
		return await this.articleService.deleteArticleBySlug(currentUserId, slug)
	}
}
