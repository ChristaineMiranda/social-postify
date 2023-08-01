import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PublicationDB } from "./dto/publication-db.dto";
import { PublicationUpdateDTO } from "./dto/publication-update.dto";

@Injectable()
export class PublicationRepository {

    constructor(private readonly prisma: PrismaService) { }

    async createPost(data: PublicationDB): Promise<PublicationDB> {
        return await this.prisma.publication.create({ data });
    }

    async listAllPosts(userId: number) {
        return await this.prisma.publication.findMany({ where: { userId } });
    }

    async findByTitle(title: string): Promise<PublicationDB> {
        return await this.prisma.publication.findFirst({ where: { title } });
    }

    async findPostById(id: number) {
        return await this.prisma.publication.findUnique({ where: { id } });
    }

    async updatePost(data: PublicationUpdateDTO, id: number) {
        return await this.prisma.publication.update({ where: { id }, data });
    }

    async deletePost(id: number) {
        await this.prisma.publication.delete({ where: { id } })       
        
    }

    async listByStatus(userId: number, published: boolean) {
        return await this.prisma.publication.findMany({ where: { userId, published } })
    }

    async findTodaysPost(today: string) {
        return await this.prisma.publication.findMany({ where: { dateToPublish: today } })
    }
}