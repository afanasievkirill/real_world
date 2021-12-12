import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	username: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	bio: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	image: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	password: string;
}

export class ApptUpdateUserDto {

	@ApiProperty({ type: () => UpdateUserDto })
	user: UpdateUserDto
}