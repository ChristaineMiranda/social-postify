import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationDTO } from './dto/publication.dto';
import { PublicationUpdateDTO } from './dto/publication-update.dto';
import { Cron } from '@nestjs/schedule';
import { UserRepository } from '../user/user.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository,
              private readonly userRepository: UserRepository,
              private readonly mailerService: MailerService){}

  @Cron('* * * * * *')
  async checkPostsDay(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()+1).padStart(2,'0');
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const todaysPost = await this.publicationRepository.findTodaysPost(date);
    
    if(todaysPost.length){
        todaysPost.forEach(async (publication) => {
          const author = await this.userRepository.findUserById(publication.userId);
          this.mailerService.sendMail({
            to:author.email,
            from: 'christainemiranda.dev@gmail.com',
            subject:'Lembrete de publicação - Social Postify',
            html:`<h3>Olá! Esse é um email de envio automático do Social Postify, um sistema de gerenciamento de postagens desenvolvido por Christaine Miranda</h3>
            <p>Você tem essa postagem agendada para hoje:</p>
            <p>Títuto: ${publication.title}</p>
            <p>Texto: ${publication.text}</p>
            <p>A ser publicada em: ${publication.socialMedia}</p>
            Para mais informações, verifique suas postagens agendadas!`,
          });
        });
    }
    
  }

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
