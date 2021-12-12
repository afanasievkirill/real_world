import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { UserService } from '@app/user/user.service';
import { CreateUserDto, AppCreateUserDto } from '@app/user/dto/create-user.dto';
import { IUserResponse } from '@app/user/types/user-responce.interface';
import {
	CREDENTIALS_ARE_NOT_VALID_ERROR,
	EMAIL_OR_USERNAME_ARE_TAKEN_ERROR,
	NOT_AUTHORIZED_ERROR,
	REQUEST_DATA_IS_NOT_VALID_ERROR
} from '@app/user/user.constants';
import { AppLoginUserDto, LoginUserDto } from './dto/login-user.dto';
import { UserResponce } from './dto/user.response';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { ApptUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) { }

	@ApiTags('users')
	@ApiCreatedResponse({ description: 'Create User is successfully', type: UserResponce })
	@ApiBadRequestResponse({ description: REQUEST_DATA_IS_NOT_VALID_ERROR })
	@ApiUnprocessableEntityResponse({ description: EMAIL_OR_USERNAME_ARE_TAKEN_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@ApiBody({ type: AppCreateUserDto })
	@UsePipes(new ValidationPipe())
	@Post('users')
	async createUser(@Body('user') createUserDto: CreateUserDto): Promise<IUserResponse> {
		const user = await this.userService.createUser(createUserDto);
		return this.userService.buildUserResponce(user);
	}

	@ApiTags('users/login')
	@ApiOkResponse({ description: 'User is successfully logged in', type: UserResponce })
	@ApiBadRequestResponse({ description: REQUEST_DATA_IS_NOT_VALID_ERROR })
	@ApiUnprocessableEntityResponse({ description: CREDENTIALS_ARE_NOT_VALID_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@ApiBody({ type: AppLoginUserDto })
	@UsePipes(new ValidationPipe)
	@HttpCode(200)
	@Post('users/login')
	async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserResponse> {
		const user = await this.userService.login(loginUserDto);
		return this.userService.buildUserResponce(user);
	}

	@ApiTags('user')
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Return this user', type: UserResponce })
	@ApiUnauthorizedResponse({ description: NOT_AUTHORIZED_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@Get('user')
	@UseGuards(AuthGuard)
	async getCurentUser(
		@User() user: UserEntity
	): Promise<IUserResponse> {
		return this.userService.buildUserResponce(user);
	}

	@ApiTags('user')
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Return this user', type: UserResponce })
	@ApiUnauthorizedResponse({ description: NOT_AUTHORIZED_ERROR })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	@ApiBody({ type: ApptUpdateUserDto })
	@Put('user')
	@UseGuards(AuthGuard)
	async updateCurrentUser(
		@User('id') currentUserId: number,
		@Body('user') updateUserDto: UpdateUserDto
	): Promise<IUserResponse> {
		const user = await this.userService.updateUser(currentUserId, updateUserDto);
		return this.userService.buildUserResponce(user);
	}

}
