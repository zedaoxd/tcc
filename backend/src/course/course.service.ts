import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { CourseRepository } from './course.repository';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';
import { FullCourseDto } from './dto/full-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async create(createCurseDto: CreateCourseDto, authorId: string) {
    return await this.repository.create(createCurseDto, authorId);
  }

  async findAll(
    page: number,
    size: number,
    search: string,
  ): Promise<PaginatedDto<SimpleCourseDto>> {
    return await this.repository.findAll(page, size, search);
  }

  async findOne(id: string): Promise<FullCourseDto> {
    const entity = await this.repository.findOne(id);

    if (!entity) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    return entity;
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
}
