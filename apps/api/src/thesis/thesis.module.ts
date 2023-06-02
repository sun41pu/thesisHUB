import { Module } from '@nestjs/common';
import { ThesisService } from './thesis.service';
import { ThesisController } from './thesis.controller';
import {CommentService} from "../comment/comment.service";

@Module({
  providers: [ThesisService, CommentService],
  controllers: [ThesisController]
})
export class ThesisModule {}
