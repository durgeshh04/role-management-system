import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../roles/entities/roles.entity';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Roles)
    private readonly rolesRepo: Repository<Roles>,
    private readonly jwtService: JwtService,
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

  async login(user): Promise<any> {
    const existingUser = await this.userRepo.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      return 'User does not exists';
    }

    const checkpasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password,
    );

    if (!checkpasswordValid) {
      return 'password is invalid';
    }

    const payload: JwtPayload = {
      sub: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };

    const token = await this.jwtService.signAsync(payload);

    return { message: 'user login successfully', token };
  }
}
