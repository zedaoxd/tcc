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

  async isAuthor(id: string) {
    const author = await this.prisma.user.findUnique({
      where: {
        id,
        AND: {
          coursesCreated: {
            some: {
              published: true,
            },
          },
        },
      },
      select: {
        _count: {
          select: {
            coursesCreated: true,
          },
        },
      },
    });

    return author._count.coursesCreated > 0;
  }
}
