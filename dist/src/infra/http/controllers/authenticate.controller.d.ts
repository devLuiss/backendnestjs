import { AuthenticateUserUseCase } from "@/domain/projectname/application/useCases/authenticate-user";
import { z } from "zod";
declare const authenticateBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
export declare class AuthenticateController {
    private authenticateUser;
    constructor(authenticateUser: AuthenticateUserUseCase);
    handle(body: AuthenticateBodySchema): Promise<{
        access_token: string;
    }>;
}
export {};
