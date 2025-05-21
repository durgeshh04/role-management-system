import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRole } from '../dtos/create-role-dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/create')
  async createNewRole(@Body() createRole: CreateRole): Promise<any> {
    return this.rolesService.createNewRole(createRole);
  }
}
