import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758289757899 implements MigrationInterface {
    name = 'Migrations1758289757899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_type_enum" AS ENUM('admin', 'manager', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "role" ("type" "public"."role_type_enum" NOT NULL DEFAULT 'viewer', CONSTRAINT "PK_9a0c91c218a16e604951ff1c099" PRIMARY KEY ("type"))`);
        await queryRunner.query(`CREATE TABLE "user" ("email" character varying NOT NULL, CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_type_role_roletype_enum" AS ENUM('admin', 'manager', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "user_role_type_role" ("userEmail" character varying NOT NULL, "roleType" "public"."user_role_type_role_roletype_enum" NOT NULL, CONSTRAINT "PK_1b8f0f031a0b40643994ecc09b2" PRIMARY KEY ("userEmail", "roleType"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c75f516d8fc1cc6bce7f53e92a" ON "user_role_type_role" ("userEmail") `);
        await queryRunner.query(`CREATE INDEX "IDX_0be06c18205ed3330499d2a837" ON "user_role_type_role" ("roleType") `);
        await queryRunner.query(`ALTER TABLE "user_role_type_role" ADD CONSTRAINT "FK_c75f516d8fc1cc6bce7f53e92a4" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role_type_role" ADD CONSTRAINT "FK_0be06c18205ed3330499d2a837f" FOREIGN KEY ("roleType") REFERENCES "role"("type") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role_type_role" DROP CONSTRAINT "FK_0be06c18205ed3330499d2a837f"`);
        await queryRunner.query(`ALTER TABLE "user_role_type_role" DROP CONSTRAINT "FK_c75f516d8fc1cc6bce7f53e92a4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0be06c18205ed3330499d2a837"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c75f516d8fc1cc6bce7f53e92a"`);
        await queryRunner.query(`DROP TABLE "user_role_type_role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_type_role_roletype_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_type_enum"`);
    }

}
