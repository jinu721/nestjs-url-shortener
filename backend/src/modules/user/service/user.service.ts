import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDTO } from '../dtos/register.dto';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IUserService } from '../interfaces/user.service.interface';
import { HttpResponse } from 'src/common/constants/response-msg.constants';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(userData: RegisterDTO): Promise<void> {
    const { username, email, password } = userData;

    const user = await this.userRepository.getUserByEmail(email);

    if (user) {
      throw new HttpException(
        HttpResponse.USER_ALREADY_EXIST,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await hashPassword

  }
}
