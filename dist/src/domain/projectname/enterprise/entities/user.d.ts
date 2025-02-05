import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
interface UserProps {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class User extends AggregateRoot<UserProps> {
    get updatedAt(): Date | undefined;
    private touch;
    get name(): string;
    set name(name: string);
    get email(): string;
    set email(email: string);
    get password(): string;
    set password(password: string);
    get createdAt(): Date;
    static create(props: Optional<UserProps, "createdAt">, id?: UniqueEntityID): User;
}
export {};
