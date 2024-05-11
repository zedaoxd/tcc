import {
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OneOrGreaterPipe implements PipeTransform {
  transform(value: number) {
    if (value < 1) {
      throw new NotAcceptableException(
        'Value must be greater than or equal to 1',
      );
    }

    return value;
  }
}
