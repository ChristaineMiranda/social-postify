import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports:[JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule, AuthModule, UserModule],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, AuthService, UserService, UserRepository,]
})
export class PublicationModule {}
