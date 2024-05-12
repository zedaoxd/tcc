import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsersHavePublishedCourses() {
    return await this.prisma.user.findMany({
      where: {
        coursesCreated: {
          some: {
            published: true,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
        _count: {
          select: {
            coursesCreated: {
              where: {
                published: true,
              },
            },
          },
        },
      },
    });
  }
}
