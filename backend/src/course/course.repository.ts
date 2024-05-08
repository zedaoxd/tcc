import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCourseDto, authorId: string) {
    return await this.prisma.course.create({
      data: { ...dto, authorId },
    });
  }

  async findAll(
    page: number,
    size: number,
    search: string,
  ): Promise<PaginatedDto<SimpleCourseDto>> {
    const totalItems = await this.prisma.course.count({
      where: {
        title: {
          contains: search,
        },
      },
    });

    const itens = await this.prisma.course.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      select: {
        id: true,
        title: true,
        soldCount: true,
        discount: true,
        modules: {
          select: {
            duration: true,
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
      take: size,
      skip: page * size,
    });

    const totalPages = Math.ceil(totalItems / size);

    return new PaginatedDto({ totalItems, page, totalPages, size, itens });
  }
}
