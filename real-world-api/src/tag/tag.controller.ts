import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
	constructor(private readonly tagService: TagService) { }

	@ApiOkResponse({
		description: 'Retrieved tags successfully'
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
