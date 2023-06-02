import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class signUpDTO {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  public username: string;

  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательна' })
  @IsEmail({}, { message: 'Почта должна быть почтой' })
  public email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  public password: string;
}

export class loginDTO {
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательна' })
  @IsEmail({}, { message: 'Почта должна быть почтой' })
  public email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  public password: string;
}
