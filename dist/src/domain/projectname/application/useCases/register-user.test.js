"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_already_exist_1 = require("./erros/user-already-exist");
const register_user_1 = require("./register-user");
const user_1 = require("../../enterprise/entities/user");
const vitest_1 = require("vitest");
(0, vitest_1.describe)("RegisterUserUseCase", () => {
    let registerUserUseCase;
    let usersRepository;
    let hashGenerator;
    (0, vitest_1.beforeEach)(() => {
        usersRepository = {
            findByEmail: vitest.fn(),
            create: vitest.fn(),
        };
        hashGenerator = {
            hash: vitest.fn(),
        };
        registerUserUseCase = new register_user_1.RegisterUserUseCase(usersRepository, hashGenerator);
    });
    (0, vitest_1.it)("should register a new user successfully", async () => {
        const request = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        };
        usersRepository.findByEmail.mockResolvedValue(null);
        hashGenerator.hash.mockResolvedValue("hashedPassword");
        usersRepository.create.mockResolvedValue(undefined);
        const response = await registerUserUseCase.execute(request);
        (0, vitest_1.expect)(response.isRight()).toBe(true);
        (0, vitest_1.expect)(response.value).toHaveProperty("user");
        (0, vitest_1.expect)(response.value.user).toBeInstanceOf(user_1.User);
        (0, vitest_1.expect)(response.value.user.email).toBe(request.email);
        (0, vitest_1.expect)(response.value.user.password).toBe("hashedPassword");
    });
    (0, vitest_1.it)("should return an error if user already exists", async () => {
        const request = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        };
        usersRepository.findByEmail.mockResolvedValue(new user_1.User());
        const response = await registerUserUseCase.execute(request);
        (0, vitest_1.expect)(response.isLeft()).toBe(true);
        (0, vitest_1.expect)(response.value).toBeInstanceOf(user_already_exist_1.UserAlreadyExistsError);
    });
});
//# sourceMappingURL=register-user.test.js.map