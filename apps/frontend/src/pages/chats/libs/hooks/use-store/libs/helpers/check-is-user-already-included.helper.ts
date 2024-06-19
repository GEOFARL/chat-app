import { type AuthResponseDto } from '~/modules/auth/auth.js';
import { type User } from '~/pages/chats/libs/types/types.js';

const checkIsUserAlreadyIncluded = (
  users: User[],
  user: AuthResponseDto['user']
) => {
  return users.some((userObj) => userObj.id === user.id);
};

export { checkIsUserAlreadyIncluded };
