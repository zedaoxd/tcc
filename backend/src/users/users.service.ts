import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsersHavePublishedCourses() {
    return await this.userRepository.getUsersHavePublishedCourses();
  }
}
