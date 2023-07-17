import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from './dto/create-user.dto';
import { signInDto } from './dto/signin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  createUser(@Body() body:createUserDTO){
    return this.userService.createUser(body);
  }

  @Post()
  signIn(@Body() body: signInDto){
    return this.userService.signIn(body);
  }
}
