import { logger } from '~/libs/modules/logger/logger.js';
import { BaseNotFoundHandler } from './base-not-found-handler.middleware.js';

const notFoundHandler = new BaseNotFoundHandler({
  logger,
});

export { notFoundHandler };
