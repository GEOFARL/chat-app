import { type UserDto } from '../../../user/user.js';

type AuthResponseDto = {
  token: string;
  user: Omit<UserDto, 'password'>;
};

export { type AuthResponseDto };
