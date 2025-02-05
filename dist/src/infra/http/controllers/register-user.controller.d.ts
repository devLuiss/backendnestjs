import { RegisterUserUseCase } from "@/domain/projectname/application/useCases/register-user";
import { z } from "zod";
declare const createUserBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
export declare class CreateUserController {
    private registerUser;
    constructor(registerUser: RegisterUserUseCase);
    handle(body: CreateUserBodySchema): Promise<void>;
}
export {};
