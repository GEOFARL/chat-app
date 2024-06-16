import { logger } from '~/libs/modules/logger/logger.js';
import { BaseHttpLogger } from './base-http-logger.middleware.js';

const httpLogger = new BaseHttpLogger({
  logger,
});

export { httpLogger };
