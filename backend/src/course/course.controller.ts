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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() createCurseDto: CreateCourseDto,
    @Req() { user: { id } }: IRequest,
  ) {
    return this.courseService.create(createCurseDto, id);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('size', new DefaultValuePipe(20)) size: number,
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<PaginatedDto<SimpleCourseDto>> {
    return this.courseService.findAll(page, size, search);
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
