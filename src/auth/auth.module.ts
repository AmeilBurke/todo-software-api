import { AccountsService } from './../accounts/accounts.service';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountsModule } from 'src/accounts/accounts.module';

// TODO: implement bcrypt

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, AccountsService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
