import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService
  ) {
  }

  async kickstart() {
    return true
  }
  async hello() {
    return 'Hello World!'
  }
  async health() {
    const DBHealth = await this.prisma.userRoles.findFirst()

    const ShadowDBHealth = true

    const BackendServer = true

    return {
      primary_database: !!DBHealth,
      secondary_database: ShadowDBHealth,
      server: BackendServer }
  }
}
