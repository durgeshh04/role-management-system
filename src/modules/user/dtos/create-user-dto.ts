import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  @Length(2, 50, { message: 'name must be between 2 to 50 characters' })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid Email address' })
  public readonly email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  public readonly password: string;

  @ApiProperty({ example: '1234567890', description: 'User mobile number' })
  @IsString()
  public readonly mobile: string;

  @ApiProperty({ example: 1, description: 'role id number' })
  @IsNumber()
  public readonly roleId: number;

  @ApiProperty({ example: 'Inactive', description: 'status of the user' })
  @IsString()
  private readonly status: string;

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
