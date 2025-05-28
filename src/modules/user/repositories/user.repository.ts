import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

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
    return this.userRepo.find();
  }
}
