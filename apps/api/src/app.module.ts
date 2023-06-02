import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThesisModule } from "./thesis/thesis.module";
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { PrismaService } from "../prisma/prisma.service";
import {DevtoolsModule} from "@nestjs/devtools-integration";

@Module({

    imports: [
      PrismaModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../../..', 'client', 'dist'),
      }),
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
      AuthModule,
      UsersModule,
      ThesisModule,
      CommentModule
    ],
    controllers: [AppController],
    providers: [AppService, CommentService, PrismaService],
})
export class AppModule {}
