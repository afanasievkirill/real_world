import { ExpressRequestInterface } from "@app/types/express-request.interface";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NOT_AUTHORIZED_ERROR } from "../user.constants";

@Injectable()
export class AuthGuard implements CanActivate {

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<ExpressRequestInterface>();

		if (request.user) {
			return true;
		}

		throw new HttpException(NOT_AUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
	}
}