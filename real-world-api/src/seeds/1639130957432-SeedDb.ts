import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1639130957432 implements MigrationInterface {
    name = 'SeedDb1639130957432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
         INSERT INTO tags (name) 
         VALUES ('javascript'), ('typescript);
         `);
        //password is 123456
        await queryRunner.query(`
         INSERT INTO users (usernname, email, password) 
         VALUES ('foo', 'foo@test.ru', '$2b$10$AAJuini6KpEVVdz46LLdkurUaGheBA2ybGUP13BY3TnPWyCNpe82C');
         `);
        await queryRunner.query(`
         INSERT INTO articles (slug, title, description, body, "tagList", "authorId) 
         VALUES ('my-article', 'my article, 'test data desc', 'test data body', 'test', 1);
         `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> { }

}
