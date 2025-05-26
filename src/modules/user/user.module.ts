import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { DataSource } from 'typeorm';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useFactory: (dataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
})
export class UserModule {}
