import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';

@Injectable()
export class CourseService {
  create(createCurseDto: CreateCourseDto) {
    return 'This action adds a new curse';
  }

  findAll() {
    return `This action returns all curses`;
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
