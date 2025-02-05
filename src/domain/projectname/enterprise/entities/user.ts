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

export class User extends AggregateRoot<UserProps> {
  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<UserProps, "createdAt">,
    id?: UniqueEntityID
  ): User {
    return new User({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }
}
