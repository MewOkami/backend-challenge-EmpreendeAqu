import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const passwordMatc = await compare(password, user.password);

    if (!passwordMatc) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    return {
      token: this.jwtService.sign({ email: email }, { subject: user.id }),
    };
  }
}
