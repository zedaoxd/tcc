import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformPropertyNumberPipe implements PipeTransform<any> {
  constructor(private readonly propertyName: string[]) {}

  transform(value: any) {
    this.propertyName.forEach((name) => {
      if (value[name]) {
        value[name] = Number(value[name]);

        if (isNaN(value[name])) {
          throw new BadRequestException(`${name} must be a number`);
        }
      }
    });

    return value;
  }
}
