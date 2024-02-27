import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.accountsService.findOne(email);
    console.log(user);
    console.log(process.env.JWT_CONSTANT);

    if (user?.account_password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.account_id, email: user.account_email };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
