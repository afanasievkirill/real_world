import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/configs/config';
import { IUserResponse } from '@app/user/types/user-responce.interface';
import { CREDENTIALS_ARE_NOT_VALID_ERROR, EMAIL_OR_USERNAME_ARE_TAKEN_ERROR } from '@app/user/user.constants';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }


	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const userByEmail = await this.userRepository.findOne({
			email: createUserDto.email
		});
		const userByUserName = await this.userRepository.findOne({
			username: createUserDto.username
		});
		if (userByEmail || userByUserName) {
			throw new HttpException(EMAIL_OR_USERNAME_ARE_TAKEN_ERROR, HttpStatus.UNPROCESSABLE_ENTITY)
		}
		const newUser = new UserEntity();
		Object.assign(newUser, createUserDto);
		return await this.userRepository.save(newUser);
	}

	async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			email: loginUserDto.email
		},
			{
				select: ['id', 'email', 'bio', 'image', 'password']
			}
		);
		if (!user) {
			throw new HttpException(CREDENTIALS_ARE_NOT_VALID_ERROR, HttpStatus.UNPROCESSABLE_ENTITY)
		}
		const isCorrectPassword = await compare(loginUserDto.password, user.password)
		if (!isCorrectPassword) {
			throw new HttpException(CREDENTIALS_ARE_NOT_VALID_ERROR, HttpStatus.UNPROCESSABLE_ENTITY)
		}
		delete user.password;
		return user;
	}

	findById(id: number): Promise<UserEntity> {
		return this.userRepository.findOne(id);
	}

	generateJwt(user: UserEntity): string {
		return sign({
			id: user.id,
			username: user.username,
			email: user.email
		},
			JWT_SECRET);
	}

	buildUserResponce(user: UserEntity): IUserResponse {
		return {
			user: {
				...user,
				token: this.generateJwt(user)
			}
		};
	}
}
