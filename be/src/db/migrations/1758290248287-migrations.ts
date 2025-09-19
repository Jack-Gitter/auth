import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758290248287 implements MigrationInterface {
    name = 'Migrations1758290248287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_type_enum" AS ENUM('admin', 'manager', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "type" "public"."role_type_enum" NOT NULL DEFAULT 'viewer', CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("email" character varying NOT NULL, CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userEmail" character varying NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_4a4871cc39565e32db0f38241a0" PRIMARY KEY ("userEmail", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd6bea37c7fbeabff6e3e7cfc9" ON "user_roles_role" ("userEmail") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_dd6bea37c7fbeabff6e3e7cfc96" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_dd6bea37c7fbeabff6e3e7cfc96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd6bea37c7fbeabff6e3e7cfc9"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_type_enum"`);
    }

}
