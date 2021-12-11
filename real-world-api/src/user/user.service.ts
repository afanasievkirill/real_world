import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/configs/config';
import { IUserResponse } from '@app/user/types/user-responce.interface';
import { EMAIL_OR_USERNAME_ARE_TAKEN_ERROR } from '@app/user/user.constants';

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
