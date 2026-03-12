# Como funcionam os Modules no NestJS

O Module é o **composition root** — o lugar onde você conecta interfaces às implementações concretas.
Pense nele como o arquivo de configuração do container de DI.

---

## A regra de ouro

```
Quem PRECISA → importa o Module de quem FORNECE
Quem FORNECE → exporta o provider
```

---

## Anatomia de um Module

```typescript
@Module({
  imports: [],    // outros modules cujos exports você quer usar aqui
  providers: [],  // classes que esse module instancia e injeta
  exports: [],    // subset de providers que outros modules podem usar
  controllers: [], // controllers registrados nesse module
})
```

---

## Os 4 módulos desse boilerplate e o papel de cada um

### 1. DatabaseModule — faz o bind interface → implementação Prisma

```typescript
// infra/database/database.module.ts
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,      // ← interface/classe abstrata (domain)
      useClass: PrismaUsersRepository, // ← implementação concreta (infra)
    },
  ],
  exports: [PrismaService, UsersRepository], // ← disponibiliza pra quem importar
})
export class DatabaseModule {}
```

**Por que exportar UsersRepository e não PrismaUsersRepository?**
Porque outros módulos só precisam saber que existe um UsersRepository — não importa qual implementação.
Isso é inversão de dependência na prática.

---

### 2. CryptographyModule — mesmo padrão, abstrações de crypto

```typescript
// infra/cryptography/cryptography.module.ts
@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: Encrypter,     useClass: JwtEncrypter },
  ],
  exports: [HashGenerator, HashComparer, Encrypter],
})
export class CryptographyModule {}
```

Um `BcryptHasher` implementa tanto `HashGenerator` quanto `HashComparer` —
por isso aparece duas vezes como `useClass`, mas o NestJS cria uma instância só (singleton por módulo).

---

### 3. HttpModule — registra controllers e use cases, importa dependências

```typescript
// infra/http/http.module.ts
@Module({
  imports: [
    DatabaseModule,       // ← precisa do UsersRepository
    CryptographyModule,   // ← precisa do HashGenerator e Encrypter
  ],
  controllers: [
    CreateUserController,
    AuthenticateController,
  ],
  providers: [
    RegisterUserUseCase,    // ← use case recebe UsersRepository (vem do DatabaseModule)
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
```

**Fluxo de injeção do RegisterUserUseCase:**
```
HttpModule importa DatabaseModule
  → DatabaseModule exporta UsersRepository
    → NestJS injeta UsersRepository em RegisterUserUseCase
      → RegisterUserUseCase injetado em CreateUserController
```

---

### 4. AppModule — raiz, apenas compõe os outros módulos

```typescript
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // env vars globais
    AuthModule,   // JWT guard global
    HttpModule,   // controllers + use cases
    EnvModule,    // typed env service
  ],
})
export class AppModule {}
```

AppModule não tem providers próprios — ele só orquestra quem entra.

---

## Regras práticas

| Situação | O que fazer |
|----------|------------|
| Use case precisa de um repositório | Importar o DatabaseModule no module do use case |
| Dois módulos precisam do PrismaService | Tornar DatabaseModule `@Global()` ou importar nos dois |
| Precisa de algo em todos os módulos (guard, interceptor) | Usar `APP_GUARD` / `APP_INTERCEPTOR` no AppModule |
| Módulo externo com config assíncrona (JWT, TypeORM) | Usar `.registerAsync()` com `useFactory` |

---

## Checklist ao criar uma feature nova

1. Criar use case em `domain/{name}/application/use-cases/`
2. Se precisar de repositório novo: criar interface em `domain/.../repositories/` e impl em `infra/database/prisma/repositories/`
3. Registrar o bind `{ provide: Interface, useClass: Impl }` no **DatabaseModule** e adicionar no `exports`
4. Adicionar o use case em `providers` do **HttpModule**
5. Criar o controller em `infra/http/controllers/` e registrar em `controllers` do **HttpModule**
6. Criar o presenter em `infra/http/presenters/`
