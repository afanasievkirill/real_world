import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@app/tag/tag.module';
import { UserModule } from './user/user.module';
import ormconfig from '@app/orm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
