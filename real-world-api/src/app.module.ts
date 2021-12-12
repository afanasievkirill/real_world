import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@app/tag/tag.module';
import { UserModule } from '@app/user/user.module';
import ormconfig from '@app/orm.config'
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
