import { PaginationParams } from "@/core/repositories/pagination-params";
import { UsersRepository } from "@/domain/projectname/application/repositories/users-repository";
import { User } from "@/domain/projectname/enterprise/entities/user";
import { UserMapper } from "@/infra/database/prisma/mappers/user-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
  async create(user: User): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async delete(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  save(user: User): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  findMany(params: PaginationParams, companyId: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
