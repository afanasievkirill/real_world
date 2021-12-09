import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@app/tag/tag.module';
import ormconfig from '@app/orm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
