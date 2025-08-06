import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MinLength(1)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
