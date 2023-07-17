import { Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from 'src/auth/authGuards/auth.guard';
import { PublicationDTO } from './dto/publication.dto';
import { UserRequest } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  @Post()
  createPost(@Body() body: PublicationDTO,
  @UserRequest() user : User){
    return this.publicationService.createPost(body, user.id);
  }

  @Get()
  listAllPosts(@UserRequest() user: User){
    return this.publicationService.listAllPosts(user.id);
  }
}
