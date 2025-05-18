import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  @Length(2, 30, { message: 'name must be between 2 to 30 characters' })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid Email address' })
  public readonly email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @Length(8, 50, { message: 'password must be between 8 to 50 characters' })
  public readonly password: string;

  @ApiProperty({ example: '1234567890', description: 'User mobile number' })
  @IsString()
  public readonly mobile: string;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'User photos',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public readonly photos?: string[];
}
