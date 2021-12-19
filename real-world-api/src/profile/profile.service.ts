import { UserEntity } from '@app/user/user.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from './follow.entity';
import { FOLLOWER_AND_FOLLOWING_CANT_BE_EQUAL_EXCEPTION, PROFILE_DOES_NOT_EXSIST_ERROR } from './profile.constants';
import { ProfileResponce } from './types/profile.responce';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(FollowEntity) private readonly followRepository: Repository<FollowEntity>
	) { }

	async getProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
		const user = await this.userRepository.findOne({
			username: profileUsername
		})
		if (!user) {
			throw new NotFoundException(PROFILE_DOES_NOT_EXSIST_ERROR);
		}
		const follow = await this.followRepository.findOne({
			followerId: currentUserId,
			followingId: user.id
		})
		return { ...user, following: Boolean(follow) };
	}

	async followProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
		const user = await this.userRepository.findOne({
			username: profileUsername
		});
		console.log(user);
		if (!user) {
			throw new NotFoundException(PROFILE_DOES_NOT_EXSIST_ERROR);
		};
		if (currentUserId === user.id) {
			throw new BadRequestException(FOLLOWER_AND_FOLLOWING_CANT_BE_EQUAL_EXCEPTION);
		};

		const follow = await this.followRepository.findOne({
			followerId: currentUserId,
			followingId: user.id
		})

		if (!follow) {
			const followToCreate = new FollowEntity();
			followToCreate.followerId = currentUserId;
			followToCreate.followingId = user.id;
			await this.followRepository.save(followToCreate)
		}

		return { ...user, following: true };
	}

	async unfollowProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
		const user = await this.userRepository.findOne({
			username: profileUsername
		})
		if (!user) {
			throw new NotFoundException(PROFILE_DOES_NOT_EXSIST_ERROR);
		}
		if (currentUserId === user.id) {
			throw new BadRequestException(FOLLOWER_AND_FOLLOWING_CANT_BE_EQUAL_EXCEPTION);
		};
		await this.followRepository.delete({
			followerId: currentUserId,
			followingId: user.id
		})
		return { ...user, following: false }
	}

	buildProfileResponce(profile: ProfileType): ProfileResponce {
		delete profile.email;
		return { profile }
	}
}
