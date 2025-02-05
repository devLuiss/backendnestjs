import { PaginationParams } from "@/core/repositories/pagination-params";
import { UsersRepository } from "@/domain/projectname/application/repositories/users-repository";
import { User } from "@/domain/projectname/enterprise/entities/user";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  constructor() {}
  findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    return Promise.resolve(user || null);
  }

  findMany({ page }: PaginationParams, companyId: string): Promise<User[]> {
    const users = this.items.slice(page * 10, page * 10 + 10);
    return Promise.resolve(users);
  }

  // COPILOT: Método para criar um novo funcionário no repositório em memória
  create(user: User): Promise<User | null> {
    this.items.push(user);
    return Promise.resolve(user);
  }

  // COPILOT: Método para deletar um funcionário do repositório em memória
  delete(user: User): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === user.id.toString()
    );
    this.items.splice(index, 1);
    return Promise.resolve();
  }

  // COPILOT: Método para atualizar um funcionário no repositório em memória
  save(user: User): Promise<User | null> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === user.id.toString()
    );
    this.items[index] = user;
    return Promise.resolve(user);
  }

  // COPILOT: Método para encontrar um funcionário pelo ID no repositório em memória
  findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === userId);
    return Promise.resolve(user || null);
  }
}
