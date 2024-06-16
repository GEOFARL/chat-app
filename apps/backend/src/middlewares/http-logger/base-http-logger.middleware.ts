import {
  type Express as Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { type Logger } from '~/libs/modules/logger/logger.js';
import { type Middleware } from '~/libs/types/types.js';

class BaseHttpLogger implements Middleware {
  private logger: Logger;

  public constructor({ logger }: { logger: Logger }) {
    this.logger = logger;
  }

  public init(app: Application): void {
    app.use((req: Request, _: Response, next: NextFunction) => {
      this.logger.info(`[${req.method}] on ${req.url}`);
      next();
    });
    this.logger.info('HTTP Logger is initialized');
  }
}

export { BaseHttpLogger };
