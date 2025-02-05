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
exports.RegisterUserUseCase = void 0;
const either_1 = require("../../../../core/either");
const users_repository_1 = require("../repositories/users-repository");
const user_already_exist_1 = require("./erros/user-already-exist");
const user_1 = require("../../enterprise/entities/user");
const common_1 = require("@nestjs/common");
const hash_generator_1 = require("../cryptography/hash-generator");
let RegisterUserUseCase = class RegisterUserUseCase {
    usersRepository;
    hashGenerator;
    constructor(usersRepository, hashGenerator) {
        this.usersRepository = usersRepository;
        this.hashGenerator = hashGenerator;
    }
    async execute({ name, email, password, }) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
        if (userWithSameEmail) {
            return (0, either_1.left)(new user_already_exist_1.UserAlreadyExistsError(email));
        }
        const hashedPassword = await this.hashGenerator.hash(password);
        const user = user_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        await this.usersRepository.create(user);
        return (0, either_1.right)({
            user,
        });
    }
};
exports.RegisterUserUseCase = RegisterUserUseCase;
exports.RegisterUserUseCase = RegisterUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_generator_1.HashGenerator])
], RegisterUserUseCase);
//# sourceMappingURL=register-user.js.map