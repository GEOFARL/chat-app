import { imageGenerator } from '~/libs/modules/image-generator/image-generator.js';
import { UserController } from './user.controller.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository();

const userService = new UserService({
  userRepository,
  imageGenerator,
});

const userController = new UserController({
  userService,
});

export { userController, userService, type UserService };
export {
  type UserSignUpRequestDto,
  type UserSignInRequestDto,
  type UserDto,
} from './libs/types/types.js';
export { UserExceptionMessage } from './libs/exceptions/exceptions.js';
