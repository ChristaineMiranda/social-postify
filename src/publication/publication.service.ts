import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationDTO } from './dto/publication.dto';
import { PublicationUpdateDTO } from './dto/publication-update.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository){}

  async listAllPosts(userId:number) {
    return await this.publicationRepository.listAllPosts(userId);
  }

  async createPost(data: PublicationDTO, userId: number) {
    const duplicatedTitle = await this.publicationRepository.findByTitle(data.title);
    if(duplicatedTitle) throw new HttpException('This title is already', HttpStatus.CONFLICT);
    const dataUser = {...data, userId}
    return await this.publicationRepository.createPost(dataUser);
  }

  async updatePost(data: PublicationUpdateDTO, userId:number, id:number){
    const isforbidden = await this.checkPermission(userId, id);
    if(isforbidden) throw new HttpException(isforbidden.message, isforbidden.status);
    return await this.publicationRepository.updatePost(data, id);
  }

  async deletePost(userId:number, postId:number){
    const isforbidden = await this.checkPermission(userId, postId);
    if(isforbidden) throw new HttpException(isforbidden.message, isforbidden.status);
    await this.publicationRepository.deletePost(postId);
  }

  async checkPermission(userId:number, postId:number){
    const postSelected = await this.publicationRepository.findPostById(postId);
    if(!postSelected) return {message: "Invalid postId", status: HttpStatus.NOT_FOUND};
    if(postSelected.userId !== userId) return{ message: 'Only authors can modify or delete posts', status: HttpStatus.UNAUTHORIZED};
  }

  async listByStatus(userId:number, published:boolean){
    return await this.publicationRepository.listByStatus(userId, published);
  }
}
