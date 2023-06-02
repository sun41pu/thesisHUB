import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { loginDTO, signUpDTO } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: signUpDTO) {
    console.log(dto);
    const { username, email, password } = dto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const candidate = await this.usersService.getByEmail(email);
    if (candidate) {
      throw new BadRequestException(
        'Пользователь с таким Email уже существует',
      );
    }

    const createdUser = await this.usersService.createUser({
      username,
      email,
      hashedPassword,
    });
    return createdUser;
  }

  async login(dto: loginDTO, response) {
    const { email, password } = dto;

    const candidate = await this.usersService.getByEmail(email);

    if (!candidate) {
      throw new BadRequestException('Email или пароль указаны неверно');
    }

    if (!(await bcrypt.compare(password, candidate.hashedPassword))) {
      throw new BadRequestException('Email или пароль указаны неверно');
    }
    
    delete candidate.hashedPassword

    const token = await this.jwtService.signAsync(
      { id: candidate.id},
      { secret: jwtConstants.secret },
    );

    response.cookie('token', token, { httpOnly: true });

    return {
      message: 'success',
      token,
      user: candidate
    };
  }
}
