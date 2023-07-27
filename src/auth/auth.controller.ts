import { Body, Controller, Post, Patch, UseGuards, Get, Delete } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthService } from "./auth.service";
import { UpdateUserDTO } from "./dto/update.dto";
import { User } from "@prisma/client";
import { UserRequest } from "./decorators/user.decorator";
import { AuthGuard } from "./authGuards/auth.guard";

@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() body: AuthLoginDTO) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post("register")
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Patch("update")
  updateUser(@Body() data: UpdateUserDTO, @UserRequest() user: User){
    return this.authService.updateUser(user.id, data);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getInfos(@UserRequest() user: User){
    const {password, ...userInfo} = user;
    return userInfo;
  }

  @UseGuards(AuthGuard)
  @Delete("delete-account")
  deleteUser(@UserRequest() user:User){
    this.authService.deleteUser(user.id);
    return "Usuário deletado com sucesso";
  }

}