import { UsersRepository } from "@/domain/projectname/application/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
