import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRole {
  @ApiProperty({ example: 'user', description: 'name of the role' })
  @IsString()
  private readonly name: string;

  @ApiProperty({ example: 'Inactivity', description: 'status of the role' })
  @IsString()
  private readonly status: string;
}
