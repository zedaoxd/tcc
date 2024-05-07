import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() createCurseDto: CreateCourseDto,
    @Req() { user: { id } }: JWTPayload,
  ) {
    return this.courseService.create(createCurseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCurseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
