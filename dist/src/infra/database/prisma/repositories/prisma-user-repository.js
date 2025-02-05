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
exports.PrismaUsersRepository = void 0;
const user_mapper_1 = require("../mappers/user-mapper");
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
let PrismaUsersRepository = class PrismaUsersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return null;
        }
        return user_mapper_1.UserMapper.toDomain(user);
    }
    async create(user) {
        throw new Error("Method not implemented.");
    }
    async delete(user) {
        throw new Error("Method not implemented.");
    }
    save(user) {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    findMany(params, companyId) {
        throw new Error("Method not implemented.");
    }
};
exports.PrismaUsersRepository = PrismaUsersRepository;
exports.PrismaUsersRepository = PrismaUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsersRepository);
//# sourceMappingURL=prisma-user-repository.js.map