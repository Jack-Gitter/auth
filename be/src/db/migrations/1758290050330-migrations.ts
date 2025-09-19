import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758290050330 implements MigrationInterface {
    name = 'Migrations1758290050330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_type_enum" AS ENUM('admin', 'manager', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "role" ("type" "public"."role_type_enum" NOT NULL DEFAULT 'viewer', CONSTRAINT "PK_9a0c91c218a16e604951ff1c099" PRIMARY KEY ("type"))`);
        await queryRunner.query(`CREATE TABLE "user" ("email" character varying NOT NULL, CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_role_roletype_enum" AS ENUM('admin', 'manager', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userEmail" character varying NOT NULL, "roleType" "public"."user_roles_role_roletype_enum" NOT NULL, CONSTRAINT "PK_73e5ef0dd1652791244b655643b" PRIMARY KEY ("userEmail", "roleType"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd6bea37c7fbeabff6e3e7cfc9" ON "user_roles_role" ("userEmail") `);
        await queryRunner.query(`CREATE INDEX "IDX_7ccc4900199b798a394d2aad3e" ON "user_roles_role" ("roleType") `);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_dd6bea37c7fbeabff6e3e7cfc96" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_7ccc4900199b798a394d2aad3e3" FOREIGN KEY ("roleType") REFERENCES "role"("type") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_7ccc4900199b798a394d2aad3e3"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_dd6bea37c7fbeabff6e3e7cfc96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ccc4900199b798a394d2aad3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd6bea37c7fbeabff6e3e7cfc9"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_role_roletype_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_type_enum"`);
    }

}
