import { Module } from '@nestjs/common';
import { CursesService } from './curses.service';
import { CursesController } from './curses.controller';

@Module({
  controllers: [CursesController],
  providers: [CursesService],
})
export class CursesModule {}
