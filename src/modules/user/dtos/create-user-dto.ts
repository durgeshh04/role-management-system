import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserCreateDto {
  @IsString()
  @Length(2, 30, { message: 'name must be between 2 to 30 characters' })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @IsEmail({}, { message: 'Invalid Email address' })
  private readonly email: string;

  @IsString()
  @Length(8, 50, { message: 'password must be between 8 to 50 characters' })
  private readonly password: string;

  @IsString()
  private readonly mobile: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  private readonly photos?: string[];
}
