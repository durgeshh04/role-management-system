import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Roles)
    private readonly rolesRepo: Repository<Roles>,
  ) {}
  async signup(user): Promise<any> {
    let userEmail = await this.userRepo.findOne({
      where: { email: user.email },
    });
    if (userEmail) {
      return 'User exists already';
    }

    let role = await this.rolesRepo.findOne({ where: { id: user.roleId } });

    if (!role) {
      return 'role does not exists';
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepo.create({
      ...user,
      password: hashedPassword,
    });

    return await this.userRepo.save(newUser);
  }
}
