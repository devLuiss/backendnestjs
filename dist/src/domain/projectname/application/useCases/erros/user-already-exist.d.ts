import { UseCaseError } from "@/core/errors/use-case-error";
export declare class UserAlreadyExistsError extends Error implements UseCaseError {
    constructor(identifier: string);
}
