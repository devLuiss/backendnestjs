import { User } from "@/domain/projectname/enterprise/entities/user";
import { Prisma, User as PrismaUser } from "@prisma/client";
export declare class UserMapper {
    static toDomain(raw: PrismaUser): User;
    static toPersistence(user: User): Prisma.UserCreateInput;
}
