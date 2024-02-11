import { IsEmail } from "class-validator";

// returns 400 error if email is not valid
export class CreateAccountDto {
  accountUsername: string;
  @IsEmail()
  accountEmail: string;
  accountPassword: string;
}
