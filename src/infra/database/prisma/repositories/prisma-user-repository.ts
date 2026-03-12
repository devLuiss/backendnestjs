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
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return UserMapper.toDomain(createdUser);
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id.toString() },
    })
  }

  async save(user: User): Promise<User | null> {
    const updated = await this.prisma.user.update({
      where: { id: user.id.toString() },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        updatedAt: new Date(),
      },
    })

    return UserMapper.toDomain(updated)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async findMany(params: PaginationParams, companyId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return users.map(UserMapper.toDomain)
  }
}
