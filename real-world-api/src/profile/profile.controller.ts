import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResponce } from './types/profile.responce';

@Controller('profiles')
export class ProfileController {
	constructor(
		private readonly profileService: ProfileService
	) { }

	@Get(':username')
	async getProfile(
		@User('id') currentUserId: number,
		@Param('username') profileUsername: string
	): Promise<ProfileResponce> {
		const profile = await this.profileService.getProfile(currentUserId, profileUsername);
		return this.profileService.buildProfileResponce(profile);
	}

	@UseGuards(AuthGuard)
	@Post(':username/follow')
	async followProfile(
		@User('id') currentUserId: number,
		@Param('username') profileUsername: string
	): Promise<ProfileResponce> {
		const profile = await this.profileService.followProfile(currentUserId, profileUsername);
		return this.profileService.buildProfileResponce(profile);
	}

	@UseGuards(AuthGuard)
	@Delete(':username/follow')
	async unfollowProfile(
		@User('id') currentUserId: number,
		@Param('username') profileUsername: string
	): Promise<ProfileResponce> {
		const profile = await this.profileService.unfollowProfile(currentUserId, profileUsername);
		return this.profileService.buildProfileResponce(profile);
	}
}
