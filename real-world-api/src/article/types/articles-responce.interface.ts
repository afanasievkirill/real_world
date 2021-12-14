import { ArticleEntity } from "@app/article/article.entity";

export interface ArticlesResponceInterface {
	articles: ArticleEntity[];
	articlesCount: number;
}