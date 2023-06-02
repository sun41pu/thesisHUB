import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from "./comment.service";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  providers: [PrismaService, CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
