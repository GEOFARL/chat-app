import { logger } from '~/libs/modules/logger/logger.js';
import { BaseErrorHandler } from './base-error-handler.middleware.js';

const errorHandler = new BaseErrorHandler({
  logger,
});

export { errorHandler };
