import { Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import { PublicationDB } from "./dto/publication-db.dto";

@Injectable()
export class PublicationRepository{
    
    constructor(private readonly prisma: PrismaService){}

    async createPublication(data: PublicationDB){
        return await this.prisma.publication.create({data});
    }

    async listAllPublications(userId:number){
        return await this.prisma.publication.findMany({where:{userId}});
    }
    
    async findByTitle(title: string) {
      return await this.prisma.publication.findFirst({where: {title}});
    }
}