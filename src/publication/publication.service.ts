import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationDTO } from './dto/publication.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository){}

  listAllPosts(userId) {
    return this.publicationRepository.listAllPublications(userId);
  }

  async createPost(data: PublicationDTO, userId: number) {
    const duplicatedTitle = await this.publicationRepository.findByTitle(data.title);
    if(duplicatedTitle) throw new HttpException('This title is already', HttpStatus.CONFLICT);
    const dataUser = {...data, userId}
    return this.publicationRepository.createPublication(dataUser);
  }
}
