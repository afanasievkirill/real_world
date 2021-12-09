import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'admin',
	password: 'admin',
	database: 'real_world',
	entities: [
		__dirname + '/**/*.entity{.ts,.js}'
	],
	synchronize: true
}

export default config;