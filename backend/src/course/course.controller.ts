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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-curse.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { PaginatedDto } from 'src/shared/paginated-dto';
import { SimpleCourseDto } from './dto/simple-course.dto';
import { FullCourseDto } from './dto/full-course.dto';
import { IsAuthorOrAdminGuard } from './guards/is-author-or-admin/is-author-or-admin.guard';
import { Response } from 'express';

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

  @Get('top-purchased')
  findTopPurchased() {
    return this.courseService.findTopPurchased();
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
  findOne(@Param('id') id: string): Promise<FullCourseDto> {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, IsAuthorOrAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateCurseDto: UpdateCourseDto,
  ): Promise<FullCourseDto> {
    return this.courseService.update(id, updateCurseDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, IsAuthorOrAdminGuard)
  remove(@Param('id') id: string, @Res() res: Response) {
    this.courseService.remove(id);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
