import { Either } from "@/core/either";
import { UsersRepository } from "@/domain/projectname/application/repositories/users-repository";
import { WrongCredentialsError } from "@/domain/projectname/application/useCases/erros/wrong-credentials";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
interface AuthenticateUserUseCaseRequest {
    email: string;
    password: string;
}
type AuthenticateUserUseCaseResponse = Either<WrongCredentialsError, {
    accessToken: string;
}>;
export declare class AuthenticateUserUseCase {
    private userRepository;
    private hashComparer;
    private encrypter;
    constructor(userRepository: UsersRepository, hashComparer: HashComparer, encrypter: Encrypter);
    execute({ email, password, }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>;
}
export {};
