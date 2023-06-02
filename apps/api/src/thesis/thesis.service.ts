import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import { ThesisCreateDTO } from "./dto";
import { query } from "express";

@Injectable()
export class ThesisService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getAllTheses(statusId, reviewrId): Promise<ThesisCreateDTO> {
        console.log('statusId', statusId)
        console.log('reviewrId', reviewrId)

        let query = {} // поиск всех работ по умолчанию если не задан параметр

        if (!!statusId) {
            query = { statusId: parseInt(statusId) };
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.prisma.thesis.findMany({
            where: query,
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  roleId: true,
                  Picture: true,
                }
              }
            }
        });
    }

    async getByThesisId(id) {
        const thesis = await this.prisma.thesis.findUnique({
            where: {
                id: parseInt(id),
            },

            include: {
                // @ts-ignore
                Comments: {
                  orderBy: {
                    createdAt: 'desc',
                  },
                  select: {
                    id: true,
                    text: true,
                    createdAt: true,
                    parent_id: true,
                    author: {
                      select: {
                        id: true,
                        username: true,
                        roleId: true,
                        Picture: true,
                      }
                    }
                  }
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        roleId: true,
                        Picture: true,
                    },
                },
                reviewer: {
                  select: {
                    id: true,
                    username: true,
                    email: true,
                    roleId: true,
                    Picture: true,
                  },
                }
            }
        });

        if (!thesis) {
            throw new NotFoundException();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore

        return thesis;
    }

    async createNewThesis({ name, description, short_description, authorId, fileLinks }) {

      console.log({ name, description, short_description, authorId, fileLinks })

        return await this.prisma.thesis.create({
            data: {
                name: name,
                description: description,
                short_description: short_description,
                authorId: authorId,
                fileLinks: fileLinks,
            },
        });
    }

    async updateThesisStatus(id, statusId, reviewrId) {
      console.log('reviewrId', reviewrId)

        const data = reviewrId
          ? {
              statusId: parseInt(statusId),
              reviewrId: `${reviewrId}`,
            }
          : {
              statusId: parseInt(statusId),
            };

      console.log(data)

        const res = await this.prisma.thesis.update({
            where: {
                id: parseInt(id),
            },
            data: data
        });

        console.log(res)
        return res
    }

    async deleteThesis(id) {
        return await this.prisma.thesis.delete({
            where: {
                id: parseInt(id),
            },
        });
    }
}
