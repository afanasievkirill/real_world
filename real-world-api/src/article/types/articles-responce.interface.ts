import { ArticleEntity } from "@app/article/article.entity";
import { ArticleType } from "./article.type";

export interface ArticlesResponceInterface {
	articles: ArticleType[];
	articlesCount: number;
}