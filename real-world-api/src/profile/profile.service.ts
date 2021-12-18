import { UserEntity } from '@app/user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PROFILE_DOES_NOT_EXSIST_ERROR } from './profile.constants';
import { ProfileResponce } from './types/profile.responce';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

	async getProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
		const user = await this.userRepository.findOne({
			username: profileUsername
		})
		if (!user) {
			throw new NotFoundException(PROFILE_DOES_NOT_EXSIST_ERROR);
		}
		return { ...user, following: false }
	}

	buildProfileResponce(profile: ProfileType): ProfileResponce {
		delete profile.email;
		return { profile }
	}
}
