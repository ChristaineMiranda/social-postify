import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {PrismaModule} from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PublicationModule } from './publication/publication.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PublicationModule,
  ScheduleModule.forRoot(),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP
      }
  }
  }),
  PresentationModule],
})
export class AppModule {}
