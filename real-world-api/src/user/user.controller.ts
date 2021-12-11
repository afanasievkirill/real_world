import { Body, Controller, Get, HttpCode, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { UserService } from '@app/user/user.service';
import { CreateUserDto, AppCreateUserDto } from '@app/user/dto/create-user.dto';
import { IUserResponse } from '@app/user/types/user-responce.interface';
import { CREDENTIALS_ARE_NOT_VALID_ERROR, EMAIL_OR_USERNAME_ARE_TAKEN_ERROR, REQUEST_DATA_IS_NOT_VALID_ERROR } from '@app/user/user.constants';
import { AppLoginUserDto, LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { Any } from 'typeorm';
import { IExpressRequestInterface } from '@app/types/express-request.interface';

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) { }

	@ApiTags('users')
	@ApiCreatedResponse({ description: 'Create User is successfully' })
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
	@ApiOkResponse({ description: 'User is successfully logged in' })
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
	@Get('user')
	async getCurentUser(@Req() request: IExpressRequestInterface): Promise<IUserResponse> {
		return this.userService.buildUserResponce(request.user);
	}

}
