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
exports.AuthenticateController = void 0;
const authenticate_user_1 = require("../../../domain/projectname/application/useCases/authenticate-user");
const public_1 = require("../../auth/public");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const authenticateBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
let AuthenticateController = class AuthenticateController {
    authenticateUser;
    constructor(authenticateUser) {
        this.authenticateUser = authenticateUser;
    }
    async handle(body) {
        const { email, password } = body;
        console.log(email, password);
        const result = await this.authenticateUser.execute({
            email,
            password,
        });
        if (result.isLeft()) {
            throw new Error();
        }
        const { accessToken } = result.value;
        return {
            access_token: accessToken,
        };
    }
};
exports.AuthenticateController = AuthenticateController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(authenticateBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "handle", null);
exports.AuthenticateController = AuthenticateController = __decorate([
    (0, common_1.Controller)("/sessions"),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [authenticate_user_1.AuthenticateUserUseCase])
], AuthenticateController);
//# sourceMappingURL=authenticate.controller.js.map