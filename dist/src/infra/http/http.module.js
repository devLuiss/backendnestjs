"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const authenticate_user_1 = require("../../domain/projectname/application/useCases/authenticate-user");
const register_user_1 = require("../../domain/projectname/application/useCases/register-user");
const cryptography_module_1 = require("../cryptography/cryptography.module");
const authenticate_controller_1 = require("./controllers/authenticate.controller");
const hello_word_controller_1 = require("./controllers/hello-word.controller");
const register_user_controller_1 = require("./controllers/register-user.controller");
const database_module_1 = require("../database/database.module");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cryptography_module_1.CryptographyModule],
        controllers: [
            authenticate_controller_1.AuthenticateController,
            hello_word_controller_1.HelloWordController,
            register_user_controller_1.CreateUserController,
        ],
        providers: [register_user_1.RegisterUserUseCase, authenticate_user_1.AuthenticateUserUseCase],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map