import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCreateDto } from '../dtos/create-user-dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async signup(@Body() userCreateDto: UserCreateDto): Promise<object> {
    return this.authService.signup(userCreateDto);
  }

  @ApiBearerAuth()
  @Get('/all')
  async findAllUsers(): Promise<String> {
    return 'Hello from user controller';
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'user Id' })
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.findUserById(id);
  }
}
