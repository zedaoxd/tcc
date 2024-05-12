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
  UseInterceptors,
  UploadedFile,
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
import { OneOrGreaterPipe } from './pipes/one-or-greater/one-or-greater.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformPropertyNumberPipe } from './pipes/transform-property-number/transform-property-number.pipe';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body(new TransformPropertyNumberPipe(['price', 'discount']))
    createCurseDto: CreateCourseDto,
    @Req() { user: { id: currentUserId } }: IRequest,
  ) {
    return this.courseService.create(createCurseDto, currentUserId, image);
  }

  @Get('top-purchased')
  findTopPurchased() {
    return this.courseService.findTopPurchased();
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), OneOrGreaterPipe) page: number,
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
