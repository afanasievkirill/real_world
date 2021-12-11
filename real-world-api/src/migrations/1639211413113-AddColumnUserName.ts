import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserName1639211413113 implements MigrationInterface {
    name = 'AddColumnUserName1639211413113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
