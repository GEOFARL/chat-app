import { UserDto, UserSignUpRequestDto } from './libs/types/types.js';

import { type UserRepository } from './user.repository.js';

class UserService {
  private userRepository: UserRepository;

  public constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  public async create(user: UserSignUpRequestDto): Promise<UserDto> {
    return this.userRepository.create(user);
  }

  public async findByEmail(email: string): Promise<UserDto | null> {
    return this.userRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<UserDto | null> {
    return this.userRepository.findById(id);
  }
}

export { UserService };
