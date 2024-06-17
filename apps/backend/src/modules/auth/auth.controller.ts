import {
  type Express as Application,
  type Request,
  type Response,
} from 'express';

import { ApiPath } from '~/libs/enums/enums.js';
import { asyncHandler } from '~/libs/helpers/helpers.js';
import { HTTPCode } from '~/libs/modules/http/http.js';
import { type Controller } from '~/libs/types/types.js';

import { type AuthService } from './auth.service.js';
import {
  ExceptionMessage,
  type ErrorDto,
} from '~/libs/exceptions/exceptions.js';

class AuthController implements Controller {
  private authService: AuthService;

  public constructor({ authService }: { authService: AuthService }) {
    this.authService = authService;
  }

  public init(app: Application): void {
    app.post(
      ApiPath.SIGN_UP,
      asyncHandler(async (request: Request, response: Response) => {
        if (request.user) {
          return response.status(HTTPCode.BAD_REQUEST).json({
            message: ExceptionMessage.ALREADY_SIGNED_IN,
            status: HTTPCode.BAD_REQUEST,
          } as ErrorDto);
        }

        const res = await this.authService.signUp(request.body);

        response.status(HTTPCode.CREATED).json(res);
      })
    );

    app.post(
      ApiPath.SIGN_IN,
      asyncHandler(async (request: Request, response: Response) => {
        if (request.user) {
          return response.status(HTTPCode.BAD_REQUEST).json({
            message: ExceptionMessage.ALREADY_SIGNED_IN,
            status: HTTPCode.BAD_REQUEST,
          } as ErrorDto);
        }

        const res = await this.authService.signIn(request.body);

        response.status(HTTPCode.OK).json(res);
      })
    );

    app.get(
      ApiPath.USER,
      asyncHandler(async (request: Request, response: Response) => {
        response.status(HTTPCode.OK).json(request.user ?? null);
      })
    );
  }

  public get name() {
    return 'Auth';
  }
}

export { AuthController };
