import ormmconfig from '@app/orm.config';

const ormseedconfig = {
	...ormmconfig,
	migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/seeds'
	}
}

export default ormseedconfig