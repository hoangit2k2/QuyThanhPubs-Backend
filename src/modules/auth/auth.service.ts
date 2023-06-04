import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sigInDto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      username: signInDto.usernames,
    });
    if (!(await bcrypt.compare(signInDto.password, user.password)))
      throw new UnauthorizedException();
    const payload = { username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
