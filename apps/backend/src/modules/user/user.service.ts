import { type ImageGenerator } from '~/libs/modules/image-generator/image-generator.js';
import { type AuthResponseDto } from '../auth/auth.js';
import { type UserDto, type UserSignUpRequestDto } from './libs/types/types.js';

import { type UserRepository } from './user.repository.js';

class UserService {
  private userRepository: UserRepository;

  private imageGenerator: ImageGenerator;

  public constructor({
    userRepository,
    imageGenerator,
  }: {
    userRepository: UserRepository;
    imageGenerator: ImageGenerator;
  }) {
    this.userRepository = userRepository;
    this.imageGenerator = imageGenerator;
  }

  public async create(user: UserSignUpRequestDto): Promise<UserDto> {
    const imageName = await this.imageGenerator.generateImage(user.fullName);

    return this.userRepository.create({ ...user, imageName });
  }

  public async findByEmail(email: string): Promise<UserDto | null> {
    return this.userRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<UserDto | null> {
    return this.userRepository.findById(id);
  }

  public async findAllWithoutCurrent(
    currentId: string
  ): Promise<AuthResponseDto['user'][]> {
    return this.userRepository.findAllWithoutCurrent(currentId);
  }
}

export { UserService };
