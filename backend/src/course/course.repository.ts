import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';
import { FullCourseDto } from './dto/full-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { Prisma } from '@prisma/client';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateManyInput) {
    return await this.prisma.course.create({
      data,
    });
  }

  async findAll({
    page = 1,
    size = 20,
    search = '',
    author: authorId,
    category: categoryId,
    level,
    price = 'all',
    rating,
  }: FindAllQueryDto): Promise<PaginatedDto<SimpleCourseDto>> {
    const where: Prisma.CourseWhereInput = {
      published: true,
    };

    if (search) {
      where.title = {
        contains: search,
      };
    }

    if (authorId) {
      where.authorId = authorId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (level) {
      where.level = level.trim() as Prisma.EnumCourseLevelFilter;
    }

    if (price === 'free') {
      where.OR = [{ discount: 1 }, { price: 0 }];
    }

    if (price === 'paid') {
      where.NOT = { OR: [{ discount: 1 }, { price: 0 }] };
    }

    if (rating) {
      where.rating = {
        gte: rating,
      };
    }

    const totalItems = await this.prisma.course.count({ where });

    const itens = await this.prisma.course.findMany({
      where,
      select: {
        id: true,
        level: true,
        title: true,
        soldCount: true,
        discount: true,
        price: true,
        imageUrl: true,
        category: {
          select: {
            name: true,
          },
        },
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
      skip: (page - 1) * size,
    });

    const totalPages = Math.ceil(totalItems / size);

    return new PaginatedDto({ totalItems, page, totalPages, size, itens });
  }

  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        price: true,
        discount: true,
        soldCount: true,
        rating: true,
        preview: true,
        level: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        modules: {
          select: {
            id: true,
            title: true,
            duration: true,
            order: true,
            lessons: {
              select: {
                id: true,
                title: true,
                duration: true,
                preview: true,
                videoUrl: true,
              },
            },
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            description: true,
            imageUrl: true,
            coursesCreated: {
              select: {
                _count: {
                  select: {
                    soldTo: true,
                  },
                },
                modules: {
                  select: {
                    _count: {
                      select: {
                        lessons: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
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
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      take: 6,
      orderBy: {
        soldCount: 'desc',
      },
    });
  }

  async findQuantityPricesTypes() {
    const paidCourses = await this.prisma.course.count({
      where: {
        published: true,
        AND: {
          NOT: { OR: [{ discount: { equals: 1 } }, { price: { equals: 0 } }] },
        },
      },
    });

    const freeCourses = await this.prisma.course.count({
      where: {
        published: true,
        AND: {
          OR: [{ discount: { equals: 1 } }, { price: { equals: 0 } }],
        },
      },
    });

    return {
      paid: paidCourses,
      free: freeCourses,
      all: paidCourses + freeCourses,
    };
  }

  async findGroupedByRating() {
    const ratings = await this.prisma.course.groupBy({
      by: ['rating'],
      where: {
        published: true,
        rating: {
          not: {
            equals: 0,
          },
        },
      },
      _count: {
        rating: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return ratings;
  }

  async findGroupedByLevel() {
    const levels = await this.prisma.course.groupBy({
      by: ['level'],
      where: {
        published: true,
      },
      _count: {
        level: true,
      },
    });

    return levels;
  }
}
