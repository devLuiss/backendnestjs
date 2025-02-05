"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
class User extends aggregate_root_1.AggregateRoot {
    get updatedAt() {
        return this.props.updatedAt;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    get name() {
        return this.props.name;
    }
    set name(name) {
        this.props.name = name;
        this.touch();
    }
    get email() {
        return this.props.email;
    }
    set email(email) {
        this.props.email = email;
        this.touch();
    }
    get password() {
        return this.props.password;
    }
    set password(password) {
        this.props.password = password;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    static create(props, id) {
        return new User({ ...props, createdAt: props.createdAt ?? new Date() }, id);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map