import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly password: string;
}

export class AppLoginUserDto {

	@ApiProperty({ type: () => LoginUserDto })
	user: LoginUserDto
}