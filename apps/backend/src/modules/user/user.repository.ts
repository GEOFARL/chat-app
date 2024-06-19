import { db } from '~/libs/modules/db/db.js';
import { type UserDto, type UserSignUpRequestDto } from './libs/types/types.js';
import { type AuthResponseDto } from '../auth/auth.js';
import { exclude } from '~/libs/helpers/helpers.js';

class UserRepository {
  public async create(
    user: UserSignUpRequestDto & { imageName: string }
  ): Promise<UserDto> {
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

  public async findAllWithoutCurrent(
    currentId: string
  ): Promise<AuthResponseDto['user'][]> {
    const users = await db.user.findMany({
      where: {
        id: {
          not: currentId,
        },
      },
    });

    return users.map((user) => exclude(user, ['password']));
  }

  public async findAllUsers(): Promise<UserDto[]> {
    return db.user.findMany({
      where: {
        isBot: false,
      },
    });
  }
}

export { UserRepository };
