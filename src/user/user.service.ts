import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {UserRepository} from './user.repository';
import { User } from '@prisma/client';
import { UpdateUserDTO } from '../auth/dto/update.dto';

@Injectable()
export class UserService {
  constructor (private readonly userRepository: UserRepository){}


  async createUser(data:createUserDTO): Promise<User> {   
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const user = await this.userRepository.findUserByEmail(data.email);
    if (user) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    return await this.userRepository.createUser({ ...data, password: hashPassword });
  }

  async findUserById(id: number) {
     const user =  await this.userRepository.findUserById(id);
     if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
     return user;
  } 

  async updateUser(userId: number, data: UpdateUserDTO) {
    const updatedUser = await this.userRepository.updateUser(userId, data); 
    const {password, ...userInfo} = updatedUser; 
    return userInfo;  
 }

 async deleteUser(userId){
  await this.userRepository.deleteUser(userId);
 }
}
