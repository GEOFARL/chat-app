import {
  type Express as Application,
  type Request,
  type Response,
} from 'express';
import { HTTPCode } from '~/libs/modules/http/http.js';

import {
  ExceptionMessage,
  type ErrorDto,
} from '~/libs/exceptions/exceptions.js';
import { type Middleware } from '~/libs/types/types.js';

class BaseNotFoundHandler implements Middleware {
  public init(app: Application): void {
    app.use((_: Request, response: Response) => {
      response.status(HTTPCode.NOT_FOUND).json({
        message: ExceptionMessage.RESOURCE_NOT_FOUND,
        status: HTTPCode.NOT_FOUND,
      } as ErrorDto);
    });
  }

  public get name(): string {
    return 'Not Found Handler';
  }
}

export { BaseNotFoundHandler };
