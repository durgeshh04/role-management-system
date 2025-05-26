import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async findUserById(id: number): Promise<any> {
    const userData = await this.userRepo.findOne({
      where: { id: id },
      relations: ['role'],
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        status: true,
        role: {
          id: true,
          name: true,
          status: true,
        },
      },
    });

    return userData ?? 'user data not found';
  }

  async findAllUser(): Promise<User[]> {
    const userData = await this.userRepo.findAllUser();
    return userData;
  }
}
