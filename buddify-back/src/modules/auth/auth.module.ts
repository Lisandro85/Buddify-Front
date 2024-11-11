import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../Users/users.entity';
import { Credentials } from '../Users/credentials/credentials.entity';
import { UsersRepository } from '../Users/users.repository';
import { UsersService } from '../Users/users.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Credentials]), MailModule],
  controllers: [AuthController],
  providers: [UsersService, UsersRepository],
})
export class AuthModule {}
