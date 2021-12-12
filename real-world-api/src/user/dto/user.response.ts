import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "../types/user.type";

class UserResponceBody {

	@ApiProperty()
	id: number;

	@ApiProperty()
	email: string;

	@ApiProperty()
	username: string;

	@ApiProperty()
	bio: string;

	@ApiProperty()
	image: string;

	password: string;

	@ApiProperty()
	token: string
}

export class UserResponce {

	@ApiProperty({ type: () => UserResponceBody })
	user: UserResponceBody;
}

