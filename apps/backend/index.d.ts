import { type UserDto } from '~/modules/user/user.js';

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}
