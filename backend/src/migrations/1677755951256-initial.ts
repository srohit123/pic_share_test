import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1677755951256 implements MigrationInterface {
  name = 'initial1677755951256'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "title" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "favourite_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "imageId" uuid, "userId" uuid, CONSTRAINT "PK_f6de4be1230624069c591bf3663" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c4e356ed53afbc48fea59d6c95" ON "favourite_images" ("userId", "imageId") `);
    await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_96514329909c945f10974aff5f8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "favourite_images" ADD CONSTRAINT "FK_d225414d4f3b1e4dd10e6a82f0c" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "favourite_images" ADD CONSTRAINT "FK_b9af64fe2606f74d193052c3fc7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favourite_images" DROP CONSTRAINT "FK_b9af64fe2606f74d193052c3fc7"`);
    await queryRunner.query(`ALTER TABLE "favourite_images" DROP CONSTRAINT "FK_d225414d4f3b1e4dd10e6a82f0c"`);
    await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_96514329909c945f10974aff5f8"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c4e356ed53afbc48fea59d6c95"`);
    await queryRunner.query(`DROP TABLE "favourite_images"`);
    await queryRunner.query(`DROP TABLE "images"`);
  }
}
