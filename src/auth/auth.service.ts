import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return {
      name: 'Hoang',
      active: 'signup',
    };
  }
  signing() {
    return {
      name: 'Hoang',
      active: 'signin',
    };
  }
}
