import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCreateDto } from '../dtos/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signup(@Body() userCreateDto: UserCreateDto): Promise<object> {
    return this.authService.signup(userCreateDto);
  }

  @Get('/all')
  async findAllUsers(): Promise<String> {
    return 'Hello from user controller';
  }
}
