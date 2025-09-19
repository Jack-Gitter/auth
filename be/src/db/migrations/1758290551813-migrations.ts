import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758290551813 implements MigrationInterface {
    name = 'Migrations1758290551813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_9a0c91c218a16e604951ff1c099" UNIQUE ("type")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_9a0c91c218a16e604951ff1c099"`);
    }

}
