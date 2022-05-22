import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {

  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'Password too weak' })
  password: string;
}