import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CursesService } from './curses.service';
import { CreateCurseDto } from './dto/create-curse.dto';
import { UpdateCurseDto } from './dto/update-curse.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('curses')
export class CursesController {
  constructor(private readonly cursesService: CursesService) { }

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createCurseDto: CreateCurseDto, @Req() { user: { id } }: JWTPayload) {
    return this.cursesService.create(createCurseDto);
  }

  @Get()
  findAll() {
    return this.cursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurseDto: UpdateCurseDto) {
    return this.cursesService.update(+id, updateCurseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursesService.remove(+id);
  }
}
