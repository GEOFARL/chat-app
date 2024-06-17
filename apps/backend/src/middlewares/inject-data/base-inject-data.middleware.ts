import {
  type NextFunction,
  type Request,
  type Response,
  type Express as Application,
} from 'express';

import { CookieName } from '~/libs/enums/enums.js';
import { asyncHandler } from '~/libs/helpers/helpers.js';
import { type Middleware } from '~/libs/types/types.js';
import { type AuthService } from '~/modules/auth/auth.js';

class BaseInjectData implements Middleware {
  private authService: AuthService;

  public constructor({ authService }: { authService: AuthService }) {
    this.authService = authService;
  }

  public init(app: Application): void {
    app.use(
      asyncHandler(
        async (request: Request, _: Response, next: NextFunction) => {
          if (request.cookies[CookieName.TOKEN]) {
            const user = await this.authService.findByToken(
              request.cookies[CookieName.TOKEN]
            );
            if (user) {
              request.user = user;
            }
          }

          next();
        }
      )
    );
  }

  public get name(): string {
    return 'Inject data';
  }
}

export { BaseInjectData };
