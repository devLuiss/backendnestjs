import { Public } from '@/infra/auth/public';
import { Controller, Get } from '@nestjs/common';

@Controller()
@Public()
export class HelloWordController {
  @Get()
  async handle() {
    return { message: 'Hello Word' };
  }
}
