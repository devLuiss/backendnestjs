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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const user_already_exist_1 = require("../../../domain/projectname/application/useCases/erros/user-already-exist");
const register_user_1 = require("../../../domain/projectname/application/useCases/register-user");
const public_1 = require("../../auth/public");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const createUserBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
let CreateUserController = class CreateUserController {
    registerUser;
    constructor(registerUser) {
        this.registerUser = registerUser;
    }
    async handle(body) {
        const { name, email, password } = body;
        const result = await this.registerUser.execute({
            name,
            email,
            password,
        });
        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case user_already_exist_1.UserAlreadyExistsError:
                    throw new common_1.ConflictException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.CreateUserController = CreateUserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createUserBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateUserController.prototype, "handle", null);
exports.CreateUserController = CreateUserController = __decorate([
    (0, common_1.Controller)("/users"),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [register_user_1.RegisterUserUseCase])
], CreateUserController);
//# sourceMappingURL=register-user.controller.js.map