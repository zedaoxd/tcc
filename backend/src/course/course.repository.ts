import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';
import { FullCourseDto } from './dto/full-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';

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

  async findOne(id: string): Promise<FullCourseDto> {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateCourseDto): Promise<FullCourseDto> {
    return await this.prisma.course.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.course.delete({
      where: {
        id,
      },
    });
  }

  async getAuthorId(courseId: string): Promise<string | undefined> {
    const author = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        authorId: true,
      },
    });

    return author?.authorId;
  }

  async findTopPurchased() {
    return await this.prisma.course.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        discount: true,
        soldCount: true,
        imageUrl: true,
        category: {
          select: {
            name: true,
          },
        },
        modules: {
          select: {
            duration: true,
          },
        },
      },
      take: 6,
      orderBy: {
        soldCount: 'desc',
      },
    });
  }
}