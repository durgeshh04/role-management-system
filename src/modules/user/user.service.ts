import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async findUserById(id: number): Promise<any> {
    return this.userRepo.findUserById(id);
  }

  async findAllUser(): Promise<User[]> {
    const userData = await this.userRepo.findAllUser();
    return userData;
  }
}
