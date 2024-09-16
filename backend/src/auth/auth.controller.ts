import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { HashPasswordPipe } from './pipes/hash-password.pipe';
import { UserLoginDTO } from './dto/user-login.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(HashPasswordPipe) data: UserCreateDTO): Promise<User> {
    return this.authService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: UserLoginDTO): Promise<AuthResponseDTO> {
    return this.authService.login(data);
  }

  @Post('verify-email')
  async verifyEmail(@Body('token') emailToken: string): Promise<User> {
    return this.authService.verifyEmail(emailToken);
  }

  @Get('email-in-use/:email')
  async emailInUse(
    @Param('email') email: string,
  ): Promise<{ emailInUse: boolean }> {
    return this.authService.emailInUse(email);
  }
}
