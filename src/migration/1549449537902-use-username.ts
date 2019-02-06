import {MigrationInterface, QueryRunner} from "typeorm";

export class useUsername1549449537902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userName" TO "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "userName"`);
    }

}
