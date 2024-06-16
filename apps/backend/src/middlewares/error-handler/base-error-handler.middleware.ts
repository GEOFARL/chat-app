import {
  type NextFunction,
  type Request,
  type Response,
  type Express as Application,
} from 'express';

import { type Logger } from '~/libs/modules/logger/logger.js';
import { HTTPCode, HTTPError } from '~/libs/modules/http/http.js';
import { type Middleware } from '~/libs/types/types.js';
import {
  ApplicationError,
  type ErrorDto,
} from '~/libs/exceptions/exceptions.js';

class BaseErrorHandler implements Middleware {
  private logger: Logger;

  public constructor({ logger }: { logger: Logger }) {
    this.logger = logger;
  }

  public init(app: Application) {
    app.use(
      (error: Error, _: Request, response: Response, __: NextFunction) => {
        if (error instanceof HTTPError) {
          this.logger.error(`[HTTP Error]: ${error.status} - ${error.message}`);

          response.status(error.status).json({
            message: error.message,
            status: error.status,
          } as ErrorDto);

          return;
        }

        if (error instanceof ApplicationError) {
          this.logger.error(`[Application Error]: ${error.message}`);
        } else {
          this.logger.error(error.message);
        }

        response.status(HTTPCode.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          status: HTTPCode.INTERNAL_SERVER_ERROR,
        } as ErrorDto);
      }
    );
  }
}

export { BaseErrorHandler };
