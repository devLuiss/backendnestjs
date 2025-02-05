import { UserAlreadyExistsError } from "@/domain/projectname/application/useCases/erros/user-already-exist";
import { RegisterUserUseCase } from "@/domain/projectname/application/useCases/register-user";
import { Public } from "@/infra/auth/public";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("/users")
@Public()
export class CreateUserController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { name, email, password } = body;

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
