import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "./../user/user.service";
import * as bcrypt from "bcrypt";
import { UpdateUserDTO } from "./dto/update.dto";

@Injectable()
export class AuthService {
  
  private EXPIRATION_TIME = "7 days";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private usersService: UserService
  ) { }

  async createToken(user: User) : Promise<{ accessToken: string; }> {
    const token = this.jwtService.sign({
      name: user.name,
      email: user.email
    }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(user.id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return {
      accessToken: token
    }
  }

  async login(email: string, password: string):Promise<{ accessToken: string; }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new UnauthorizedException(`Email or password not valid.`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException(`Email or password not valid.`);

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) :Promise<{ accessToken: string; }>{
    const user = await this.usersService.createUser(data);
    return this.createToken(user);
  }

  async checkToken(token: any) {
    try {
        const data = this.jwtService.verify(token, {
          issuer: this.ISSUER,
          audience: this.AUDIENCE,
        });
  
        return data;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }
  }

  async updateUser(userId: number, data: UpdateUserDTO) {
    const userInfo = await this.usersService.updateUser(userId, data); 
    return userInfo;  
 }

 async deleteUser(userId:number){
   await this.usersService.deleteUser(userId);
 }
}