import { jsonWebToken } from '~/libs/modules/jsonwebtoken/jsonwebtoken.js';
import { encrypt } from '~/libs/modules/encrypt/encrypt.js';

import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

import { userService } from '~/modules/user/user.js';

const authService = new AuthService({
  jsonWebToken,
  encrypt,
  userService,
});

const authController = new AuthController({
  authService,
});

export { authController, authService, type AuthService };
