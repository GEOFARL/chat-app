import { type UserDto } from './user-dto.type.js';

type UserSignUpRequestDto = Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'>;

export { type UserSignUpRequestDto };
