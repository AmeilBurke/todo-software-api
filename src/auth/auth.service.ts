import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { encryptPassword } from 'src/bcrypt/encryptPassword';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.accountsService.findOne(email);

    if (typeof user !== 'string') {
      if (user?.account_password) {
        if (await bcrypt.compare(password, user.account_password)) {
          const payload = { sub: user.account_id, email: user.account_email };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        } else {
          throw new UnauthorizedException();
        }
      }
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.accountsService.findOne(email);
    const hashPassword = await encryptPassword(password);
    console.log(user);
    console.log(hashPassword);
    if (user && typeof user !== "string" && await bcrypt.compare(password, user.account_password)) {
      const { account_password, ...result } = user;
      return result;
    }
    return null;
  }
}
