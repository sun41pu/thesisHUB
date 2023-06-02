import { BadRequestException, Injectable } from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService){}

    async findByThesis(id) {

        return await this.prisma.comment.findMany({
            where: {
                thesisId: id,
            },
        });
    }

    async findByAuthor(id) {

        return await this.prisma.comment.findMany({
            where: {
                authorId: id,
            },
        });
    }

    async findAll() {

        const comments = await this.prisma.comment.findMany({
            where: {
                // // @ts-ignore
                // parent_id: null,
            },
        });

        return comments;
    }

    async createComment(dto) {
        const { text, authorId, thesisId, parent_id } = dto

        if (parent_id !== null) {
            const candidate = await this.prisma.comment.findUnique({
                where: {
                    id: parent_id,
                },
            })
            if (!candidate) {
                throw new BadRequestException('Родительский комментарий не существует')
            }
        }
        
        const res = await this.prisma.comment.create({
            data: {
                text: text,
                authorId: authorId,
                thesisId: thesisId,
                parent_id: parent_id //  null if no parent
            },
        });

        return res
    }

    async getById(id) {
        return await this.prisma.comment.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }

}
