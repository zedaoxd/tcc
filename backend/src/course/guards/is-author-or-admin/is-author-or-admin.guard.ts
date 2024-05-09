import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLE } from 'src/auth/roles/role.decorator';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class IsAuthorOrAdminGuard implements CanActivate {
  constructor(private readonly service: CourseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JWTPayload = request.user;

    if (user.role === ROLE.ADMIN) {
      return true;
    }

    const courseId = request.params.id;

    return await this.service.isAuthor(courseId, user.id);
  }
}
