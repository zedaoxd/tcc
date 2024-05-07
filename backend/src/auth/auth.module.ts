import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthRepository } from './auth.repository';
import { IsUniqueEmailValidator } from './validator/is-unique-email-validator';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import { SendEmailModule } from 'src/send-email/send-email.module';

@Module({
  imports: [
    SendEmailModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AuthRepository,
    IsUniqueEmailValidator,
    JwtService,
  ],
})
export class AuthModule { }
