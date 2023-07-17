import { Injectable } from "@nestjs/common";
import { createUserDTO } from "./dto/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";
@Injectable()
export class UserRepository{
    constructor(private readonly prisma: PrismaService){}

    async createUser(data: createUserDTO) {
        return await this.prisma.user.create({ data });
    }

    async findUserByEmail(email:string){
        return await this.prisma.user.findFirst({where: {email}});
    }
    
    async findUserById(id: number) {
        return await this.prisma.user.findFirst({ where: { id } });
    }
}