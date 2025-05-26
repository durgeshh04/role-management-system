import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserCreateDto } from '../dtos/create-user-dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { UserLogin } from '../dtos/user-login-dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

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

  @Post('login')
  async login(@Body() userLogin: UserLogin): Promise<any> {
    return this.authService.login(userLogin);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get('/all')
  async findAllUsers(): Promise<any[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'user Id' })
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.findUserById(id);
  }
}
