import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {ThesisService} from "./thesis.service";
import {CommentService} from "../comment/comment.service";

@Controller('thesis')
export class ThesisController {
    constructor(private prisma: PrismaService, private thesisService: ThesisService) {

    }

    // http://localhost:5173/api/thesis/all?statusId=1&reviewrId=null
    @Get('all?')
    async getAllTheses(
      @Query('statusId') statusId:number,
      @Query('reviewrId') reviewrId:string)
    {
        return this.thesisService.getAllTheses(statusId, reviewrId)

    }

    // http://localhost:5173/api/thesis/1
    @Get(':id')
    async GetByThesisId(@Param('id') id){
        return await this.thesisService.getByThesisId(id);
    }

    // http://localhost:5173/api/thesis/newThesis
    @Post('newThesis')
    async createNewThesis(@Body() dto){
        console.log(dto);
        return this.thesisService.createNewThesis(dto);
    }

    //TODO: имплементировать canActivate интерфейс
    @Patch('update/:id')
    async updateThesisStatus(
      @Param('id') id,
      @Query('statusId') statusId:number ,
      @Query('revid') reviewrId:string ) {
        return this.thesisService.updateThesisStatus(id, statusId, reviewrId);
    }

    @Delete(':id')
    async deleteThesis(@Param('id') id){
        return this.thesisService.deleteThesis(id);
    }
}
