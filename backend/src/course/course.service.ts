import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { CourseRepository } from './course.repository';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';

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

  findOne(id: number) {
    return `This action returns a #${id} curse`;
  }

  update(id: number, updateCurseDto: UpdateCourseDto) {
    return `This action updates a #${id} curse`;
  }

  remove(id: number) {
    return `This action removes a #${id} curse`;
  }
}
