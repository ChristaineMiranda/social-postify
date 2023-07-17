import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { UserRepository } from "src/user/user.repository";

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository],
  exports: [AuthService]
})
export class AuthModule {

}