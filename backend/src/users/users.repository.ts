import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMyCreatedCourses(userId: string) {
    const { coursesCreated } = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        coursesCreated: {
          select: {
            author: { select: { firstName: true, lastName: true } },
            id: true,
            imageUrl: true,
            category: { select: { name: true } },
            title: true,
            published: true,
          },
          orderBy: { title: 'asc' },
        },
      },
    });

    return coursesCreated;
  }

  async getMyPurchasedCourses(userId: string) {
    const { coursesPurchased } = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        coursesPurchased: {
          select: {
            course: {
              select: {
                author: { select: { firstName: true, lastName: true } },
                id: true,
                imageUrl: true,
                category: { select: { name: true } },
                title: true,
              },
            },
          },
          orderBy: { course: { title: 'asc' } },
        },
      },
    });

    return coursesPurchased.map(({ course }) => course);
  }

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
