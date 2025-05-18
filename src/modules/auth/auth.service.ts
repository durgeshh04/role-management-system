import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup(user): Promise<object> {
    return user;
  }
}
