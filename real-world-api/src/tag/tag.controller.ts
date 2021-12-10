import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TagEntity, TagsResponce } from './tag.entity';
import { TagService } from './tag.service';

@ApiTags('tags')
@Controller('tags')
export class TagController {
	constructor(private readonly tagService: TagService) { }

	@ApiOkResponse({
		description: 'Retrieved tags successfully',
		type: TagsResponce
	})
	@ApiInternalServerErrorResponse({
		description: 'Internal server error',
	})
	@Get()
	async findAll(): Promise<{ tags: string[] }> {
		const tags = await this.tagService.findAll();
		return {
			tags: tags.map((tag) => tag.name)
		}
	}
}
