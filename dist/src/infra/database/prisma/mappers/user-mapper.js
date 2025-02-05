"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const user_1 = require("../../../../domain/projectname/enterprise/entities/user");
class UserMapper {
    static toDomain(raw) {
        return user_1.User.create({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPersistence(user) {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user-mapper.js.map