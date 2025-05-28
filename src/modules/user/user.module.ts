import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserResolver],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
})
export class UserModule {}
