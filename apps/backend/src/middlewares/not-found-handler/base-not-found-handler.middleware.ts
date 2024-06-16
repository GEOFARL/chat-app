import { HTTPCode } from '~/libs/modules/http/http.js';
import {
  type Request,
  type Response,
  type Express as Application,
} from 'express';

import { type Middleware } from '~/libs/types/types.js';
import {
  type ErrorDto,
  ExceptionMessage,
} from '~/libs/exceptions/exceptions.js';
import { type Logger } from '~/libs/modules/logger/logger.js';

class BaseNotFoundHandler implements Middleware {
  private logger: Logger;

  public constructor({ logger }: { logger: Logger }) {
    this.logger = logger;
  }

  public init(app: Application): void {
    app.use((_: Request, response: Response) => {
      response.status(HTTPCode.NOT_FOUND).json({
        message: ExceptionMessage.RESOURCE_NOT_FOUND,
        status: HTTPCode.NOT_FOUND,
      } as ErrorDto);
    });

    this.logger.info('Not Found Handler is initialized');
  }
}

export { BaseNotFoundHandler };
