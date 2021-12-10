import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTags1639130957432 implements MigrationInterface {
    name = 'CreateTags1639130957432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" 
        ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"));
         INSERT INTO tags (name) VALUES ('javascript');
         INSERT INTO tags (name) VALUES ('typescript')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
