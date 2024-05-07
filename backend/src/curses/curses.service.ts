import { Injectable } from '@nestjs/common';
import { CreateCurseDto } from './dto/create-curse.dto';
import { UpdateCurseDto } from './dto/update-curse.dto';

@Injectable()
export class CursesService {
  create(createCurseDto: CreateCurseDto) {
    return 'This action adds a new curse';
  }

  findAll() {
    return `This action returns all curses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curse`;
  }

  update(id: number, updateCurseDto: UpdateCurseDto) {
    return `This action updates a #${id} curse`;
  }

  remove(id: number) {
    return `This action removes a #${id} curse`;
  }
}
