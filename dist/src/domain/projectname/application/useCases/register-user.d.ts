import { Either } from "@/core/either";
import { UsersRepository } from "@/domain/projectname/application/repositories/users-repository";
import { UserAlreadyExistsError } from "@/domain/projectname/application/useCases/erros/user-already-exist";
import { User } from "@/domain/projectname/enterprise/entities/user";
import { HashGenerator } from "../cryptography/hash-generator";
interface RegisterUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}
type RegisterUserUseCaseResponse = Either<UserAlreadyExistsError, {
    user: User;
}>;
export declare class RegisterUserUseCase {
    private usersRepository;
    private hashGenerator;
    constructor(usersRepository: UsersRepository, hashGenerator: HashGenerator);
    execute({ name, email, password, }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>;
}
export {};
