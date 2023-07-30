import { Body, Controller, Get, Post, UseGuards, Patch, Delete, Param, ParseIntPipe, ParseBoolPipe} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from '../auth/authGuards/auth.guard';
import { PublicationDTO } from './dto/publication.dto';
import { UserRequest } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { PublicationUpdateDTO } from './dto/publication-update.dto';

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

  @Patch(":id")
  updatePost(@Body() data:PublicationUpdateDTO, @UserRequest() user:User, @Param('id', ParseIntPipe) id:number){
    return this.publicationService.updatePost(data, user.id, id);
  }

  @Delete(":id")
  deletePost(@UserRequest() user:User, @Param('id', ParseIntPipe)id:number){
    return this.publicationService.deletePost(user.id, id);
  }

  @Get(":status")
  listByStatus(@UserRequest() user:User, @Param('status', ParseBoolPipe) published:boolean){
    return this.publicationService.listByStatus(user.id, published);
  }
}
