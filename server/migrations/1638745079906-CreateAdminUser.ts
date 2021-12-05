import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { AdminUserSeed } from "../seed/adminUser.seed"

export class CreateAdminUser1638745079906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const defaultUser = await getRepository("user").save(
            AdminUserSeed
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}