import { Module } from "@nestjs/common";

import { AuthenticateUserUseCase } from "@/domain/projectname/application/useCases/authenticate-user";
import { RegisterUserUseCase } from "@/domain/projectname/application/useCases/register-user";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { AuthenticateController } from "@/infra/http/controllers/authenticate.controller";
import { HelloWordController } from "@/infra/http/controllers/hello-word.controller";
import { CreateUserController } from "@/infra/http/controllers/register-user.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    HelloWordController,
    CreateUserController,
  ],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
