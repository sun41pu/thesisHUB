import { Controller, Get, Param, Post, Body, Req } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CommentService } from "./comment.service";
import { CreateCommentDTO } from "./dto";

@Controller('comment')
export class CommentController {

  constructor(private prisma: PrismaService, private commentService: CommentService ) {}

  @Post("new")
  async createNewComment(@Body() dto: CreateCommentDTO) {
    return await this.commentService.createComment(dto);
  }

  @Get('all')
  async findAllComments() {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async GetByCommentId(@Param('id') id){
    return await this.commentService.getById(id);
  }

}
