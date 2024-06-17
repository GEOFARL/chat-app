import { db } from '~/libs/modules/db/db.js';
import { type UserDto, type UserSignUpRequestDto } from './libs/types/types.js';

class UserRepository {
  public async create(user: UserSignUpRequestDto): Promise<UserDto> {
    return db.user.create({
      data: user,
    });
  }

  public async findByEmail(email: string): Promise<UserDto | null> {
    return db.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<UserDto | null> {
    return db.user.findFirst({
      where: {
        id,
      },
    });
  }
}

export { UserRepository };
