import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/projectname/enterprise/entities/user";
import { Prisma, User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
