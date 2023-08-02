import { Test, TestingModule } from '@nestjs/testing';
import { PublicationService } from './publication.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationRepository } from './publication.repository';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

describe('PublicationService', () => {
  let service: PublicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule, UserModule, MailerModule,], 
      providers: [PublicationService, PublicationRepository, UserRepository, MailerService ],
    }).compile();

    service = module.get<PublicationService>(PublicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
