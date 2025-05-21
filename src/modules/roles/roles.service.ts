import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepo: Repository<Roles>,
  ) {}
  async createNewRole(role) {
    const existingRole = await this.rolesRepo.findOne({
      where: { name: role.name },
    });
    if (existingRole) {
      return 'role exists already';
    }
    const newRole = await this.rolesRepo.create(role);
    return await this.rolesRepo.save(newRole);
  }
}
