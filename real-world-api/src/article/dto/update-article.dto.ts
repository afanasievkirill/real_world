import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateArticleDto {

	@ApiProperty()
	@IsOptional()
	readonly title: string;

	@ApiProperty()
	@IsOptional()
	readonly description: string;

	@ApiProperty()
	@IsOptional()
	readonly body: string;
}

export class AppUpdateArticleDto {

	@ApiProperty({ type: () => UpdateArticleDto })
	article: UpdateArticleDto;
}