import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('published-courses')
  async getUsersHavePublishedCourses() {
    return await this.usersService.getUsersHavePublishedCourses();
  }

  @UseGuards(JwtGuard)
  @Get('my-purchased-courses')
  async getMyPurchasedCourses(@Req() { user: { id: currentUser } }: IRequest) {
    return await this.usersService.getMyPurchasedCourses(currentUser);
  }

  @UseGuards(JwtGuard)
  @Get('my-created-courses')
  async getMyCreatedCourses(@Req() { user: { id: currentUser } }: IRequest) {
    return await this.usersService.getMyCreatedCourses(currentUser);
  }
}
