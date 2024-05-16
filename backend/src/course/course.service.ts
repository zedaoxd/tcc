import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { CourseRepository } from './course.repository';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';
import { FullCourseDto } from './dto/full-course.dto';
import { UploadService } from 'src/upload/upload.service';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { FindOneCourseDto } from './dto/find-one-course.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly repository: CourseRepository,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    createCurseDto: CreateCourseDto,
    authorId: string,
    image: Express.Multer.File,
  ) {
    const imageUrl = await this.uploadService.uploadFile(image, 'video-thumbs');

    return this.repository.create({
      authorId,
      imageUrl,
      categoryId: createCurseDto.categoryId,
      description: createCurseDto.description,
      price: createCurseDto.price,
      title: createCurseDto.title,
      level: createCurseDto.level,
    });
  }

  async findAll(
    query: FindAllQueryDto,
  ): Promise<PaginatedDto<SimpleCourseDto>> {
    return await this.repository.findAll(query);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne(id);

    if (!entity) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    const { quantityLessons, quantityStudents } =
      entity.author.coursesCreated.reduce(
        (acc, course) => {
          return {
            quantityLessons:
              acc.quantityLessons +
              course.modules.reduce(
                (acc, module) => acc + module._count.lessons,
                0,
              ),
            quantityStudents: acc.quantityStudents + course._count.soldTo,
          };
        },
        { quantityLessons: 0, quantityStudents: 0 },
      );

    const dto = new FindOneCourseDto({
      ...entity,
      author: {
        ...entity.author,
        coursesCreated: { quantityLessons, quantityStudents },
      },
    });

    return dto;
  }

  async update(
    id: string,
    updateCurseDto: UpdateCourseDto,
  ): Promise<FullCourseDto> {
    return await this.repository.update(id, updateCurseDto);
  }

  async remove(id: string) {
    const entity = await this.repository.remove(id);

    if (!entity) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    return;
  }

  async isAuthor(courseId: string, authorId: string): Promise<boolean> {
    const authorIdFromCourse = await this.repository.getAuthorId(courseId);

    if (!authorIdFromCourse) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    return authorIdFromCourse === authorId;
  }

  async findTopPurchased() {
    return await this.repository.findTopPurchased();
  }

  async findQuantityPricesTypes() {
    return await this.repository.findQuantityPricesTypes();
  }

  async findGroupedByRating() {
    return await this.repository.findGroupedByRating();
  }

  async findGroupedByLevel() {
    return await this.repository.findGroupedByLevel();
  }
}
