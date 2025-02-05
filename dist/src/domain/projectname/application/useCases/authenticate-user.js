"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserUseCase = void 0;
const either_1 = require("../../../../core/either");
const users_repository_1 = require("../repositories/users-repository");
const wrong_credentials_1 = require("./erros/wrong-credentials");
const common_1 = require("@nestjs/common");
const encrypter_1 = require("../cryptography/encrypter");
const hash_comparer_1 = require("../cryptography/hash-comparer");
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    userRepository;
    hashComparer;
    encrypter;
    constructor(userRepository, hashComparer, encrypter) {
        this.userRepository = userRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
    }
    async execute({ email, password, }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return (0, either_1.left)(new wrong_credentials_1.WrongCredentialsError());
        }
        const isPasswordValid = await this.hashComparer.compare(password, user.password);
        if (!isPasswordValid) {
            return (0, either_1.left)(new wrong_credentials_1.WrongCredentialsError());
        }
        const accessToken = await this.encrypter.encrypt({
            sub: user.id.toString(),
        });
        return (0, either_1.right)({
            accessToken,
        });
    }
};
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
exports.AuthenticateUserUseCase = AuthenticateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_comparer_1.HashComparer,
        encrypter_1.Encrypter])
], AuthenticateUserUseCase);
//# sourceMappingURL=authenticate-user.js.map