import { Controller, Get } from '@nestjs/common';

@Controller('User')
export class UserController {
  @Get()
  findAllUsers(): string {
    return 'hello';
  }
}
