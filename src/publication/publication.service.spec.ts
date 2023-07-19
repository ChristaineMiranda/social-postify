import { Test, TestingModule } from '@nestjs/testing';
import { PublicationService } from './publication.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationRepository } from './publication.repository';
import { PrismaService } from 'nestjs-prisma';
import { PublicationModule } from './publication.module';

describe('PublicationService', () => {
  let service: PublicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PublicationModule, PrismaModule],
      providers: [PublicationService, PublicationRepository, PrismaService],
    }).compile();

    service = module.get<PublicationService>(PublicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
