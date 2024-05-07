import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { AuthRepository } from './auth.repository';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailTemplates } from 'src/send-email/send-email.service';
import * as crypto from 'crypto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { SendEmailQueueService } from 'src/send-email/job/send-email-queue/send-email-queue.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly sendEmailQueueService: SendEmailQueueService,
    ) { }

    async login(data: UserLoginDTO): Promise<AuthResponseDTO> {
        const user = await this.authRepository.findUserByEmail(data.email);

        if (!user) {
            throw new NotFoundException(`User not found with this email: ${data.email}`)
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.emailVerified) {
            throw new UnauthorizedException('Email not verified');
        }

        return new AuthResponseDTO({
            user,
            token: this.createToken(user.id, user.email, user.role)
        });;
    }

    async createUser(data: UserCreateDTO): Promise<User> {
        const emailToken = crypto.randomUUID();

        const user = await this.authRepository.registerUser(new User({ ...data, emailToken }));

        await this.sendEmailQueueService.execute({
            subject: 'Welcome to our platform',
            to: user.email,
            template: EmailTemplates.REGISTER_CONFIRMATION,
            variables: {
                verificationLink: `${this.configService.get<string>('FRONTEND_URL')}/verify-email?token=${emailToken}`,
                firstName: user.firstName,
            }
        })

        return new User(user);
    }

    async verifyEmail(token: string): Promise<User> {
        const user = await this.authRepository.findUserByEmailToken(token);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const updatedUser = await this.authRepository.updateUser(user.id, { emailToken: null, emailVerified: true });

        return new User(updatedUser);
    }

    private createToken(id: string, email: string, role: string): string {
        const payload: JWTPayload = {
            user: {
                id,
                email,
                role,
            }
        };

        return this.jwtService.sign(payload);
    }
}
