import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserEntity } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@ApiCreatedResponse({
		description: 'Create User is successfully',
	})
	@ApiInternalServerErrorResponse({
		description: 'Internal server error',
	})
	@Post()
	async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserEntity> {
		return this.userService.createUser(createUserDto);
	}
}
