import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserResponseDTO } from './dto';
import { request } from 'express';
import { JwtService } from '@nestjs/jwt';
export default function excludes(array, keys) {
  console.log(array, keys);

  for (const key of keys) {
    delete array[key];
  }
  return array;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getAll(): Promise<UserResponseDTO> {
    const user = await this.prisma.user.findMany({
      where: {},
      select: {
        // omit password
        id: true,
        username: true,
        email: true
      },
    });


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return user;
  }
  async getById(id) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Authorsip: true
      }
    });

    // console.log(user)

    if (!user) {
      throw new NotFoundException();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    delete user['hashedPassword'];

    return user;
  }

  async getByEmail(email) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log(user);

    return user;
  }

  async createUser(dto) {
    const { username, email, hashedPassword } = dto;

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });
    if (user) {
      delete user.hashedPassword;
    }

    return user;
  }

  async user(req) {
    try {
      const cookie = req.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException('Ошибка авторизации, попробуйте еще раз или обратитесь к администратору');
      }

      const user = await this.getById(data['id']);

      return user;
    } catch (e) {
      throw new UnauthorizedException('Ошибка авторизации, попробуйте еще раз или обратитесь к администратору');
    }
  }

  async updateProfilePic(id, url) {
    console.log("id", id);
    console.log("url", url);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        Picture: `${url.picture}`,
      },
    });

    return user
  }
  async deleteUser(id) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user
  }
}
