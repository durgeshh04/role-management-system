import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalExceptionFilter } from 'src/modules/filters/global.exception.handler';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<any> {
    try {
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

      if (!userData) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'user not found',
          timestamp: new Date().toISOString(),
        };
      }

      return userData;
    } catch (error) {
      console.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepo.find();
  }
}
