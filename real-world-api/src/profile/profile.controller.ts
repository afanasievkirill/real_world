import { User } from '@app/user/decorators/user.decorator';
import { Controller, Get, Param } from '@nestjs/common';
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
}
