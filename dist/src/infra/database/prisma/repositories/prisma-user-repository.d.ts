import { PaginationParams } from "@/core/repositories/pagination-params";
import { UsersRepository } from "@/domain/projectname/application/repositories/users-repository";
import { User } from "@/domain/projectname/enterprise/entities/user";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
export declare class PrismaUsersRepository implements UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User | null>;
    delete(user: User): Promise<void>;
    save(user: User): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findMany(params: PaginationParams, companyId: string): Promise<User[]>;
}
