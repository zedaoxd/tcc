import { ValidatorConstraintInterface } from 'class-validator';
import { UserRepository } from 'src/users/users.repository';

export class IsAuthorExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(authorId: string) {
    return await this.userRepository.isAuthor(authorId);
  }

  defaultMessage() {
    return 'Author does not exist or does not have published courses.';
  }
}
