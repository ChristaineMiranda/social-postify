import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {UserRepository} from './user.repository';
import {signInDto} from './dto/signin-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor (private readonly userRepository: UserRepository){}


  async createUser(data:createUserDTO): Promise<User> {   
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const user = await this.userRepository.findUserByEmail(data.email);
    if (user) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    return await this.userRepository.createUser({ ...data, password: hashPassword });
  }

  async signIn(data:signInDto){
    const user = await this.userRepository.findUserByEmail(data.email);
    if(!user) throw new HttpException('Invalid Email or password', HttpStatus.UNAUTHORIZED);
    const compare = bcrypt.compareSync(data.password, user.password);
    if(!compare) throw new HttpException('Invalid Email or password', HttpStatus.UNAUTHORIZED);
    
  }

  async findUserById(id: number) {
     const user =  await this.userRepository.findUserById(id);
     if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
     return user;
  }
  

}
