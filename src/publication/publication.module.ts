import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports:[ AuthModule, UserModule],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, UserService, UserRepository]
})
export class PublicationModule {}
