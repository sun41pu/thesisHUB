import { Body, Controller, Delete, Get, Param, Patch, Req } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService, private usersService: UsersService) {
  }

  // get запрос на api/users/ вернет пользователя из cookie
  @Get()
  async user(@Req() request) {
    return this.usersService.user(request)
  }

  @Get('all')
  async getAll()  {
    return this.usersService.getAll()
  }

  @Get(':id')
  async getById(
    @Param('id') id ) {
    return this.usersService.getById(id)
  }

  @Patch(':id')
  async updateProfilePic(
    @Param('id') id,
    @Body() body
  )  {
    return this.usersService.updateProfilePic(id, body)
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id
  )  {
    return this.usersService.deleteUser(id)
  }
}
