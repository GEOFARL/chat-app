import {
  type Request,
  type Response,
  type Express as Application,
} from 'express';
import { type Controller } from '~/libs/types/types.js';
import { ApiPath } from '~/libs/enums/enums.js';

import { type UserService } from './user.service.js';
import { requireAuth } from '~/middlewares/require-auth/require-auth.js';
import { asyncHandler } from '~/libs/helpers/helpers.js';
import { HTTPCode } from '~/libs/modules/http/http.js';

class UserController implements Controller {
  private userService: UserService;

  public constructor({ userService }: { userService: UserService }) {
    this.userService = userService;
  }

  public init(app: Application) {
    app.get(
      ApiPath.USERS,
      requireAuth,
      asyncHandler(async (request: Request, response: Response) => {
        const users = await this.userService.findAllWithoutCurrent(
          request.user!.id
        );

        response.status(HTTPCode.OK).json(users);
      })
    );
  }

  public get name(): string {
    return 'User';
  }
}

export { UserController };
