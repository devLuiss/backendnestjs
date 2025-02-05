import { PaginationParams } from "@/core/repositories/pagination-params";
import { User } from "@/domain/projectname/enterprise/entities/user";
export declare abstract class UsersRepository {
    abstract create(user: User): Promise<User | null>;
    abstract delete(user: User): Promise<void>;
    abstract save(user: User): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findMany(params: PaginationParams, companyId: string): Promise<User[]>;
}
