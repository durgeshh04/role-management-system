import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLogin {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'enter email of the user',
  })
  @IsString()
  private readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'enter password of the user for login',
  })
  private readonly password: string;
}
