import { ApiProperty } from "@nestjs/swagger";
import { ArticleEntity } from "../article.entity";


export class ArticleResponce {
	@ApiProperty({ type: () => ArticleEntity })
	article: ArticleEntity
}