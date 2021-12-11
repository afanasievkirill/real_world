import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { IUserResponse } from '@app/user/types/user-responce.interface';
import { EMAIL_OR_USERNAME_ARE_TAKEN_ERROR, REQUEST_DATA_IS_NOT_VALID_ERROR } from '@app/user/user.constants';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@ApiCreatedResponse({ description: 'Create User is successfully' })
	@ApiBadRequestResponse({ description: REQUEST_DATA_IS_NOT_VALID_ERROR })
	@ApiUnprocessableEntityResponse({ description: EMAIL_OR_USERNAME_ARE_TAKEN_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@ApiBody({ type: CreateUserDto })
	@UsePipes(new ValidationPipe())
	@Post()
	async createUser(@Body('user') createUserDto: CreateUserDto): Promise<IUserResponse> {
		const user = await this.userService.createUser(createUserDto);
		return this.userService.buildUserResponce(user);
	}

}
