import { config } from '../config/config.js';
import { logger } from '../logger/logger.js';
import { BaseServerApplication } from './base-server-application.module.js';

const serverApplication = new BaseServerApplication({
  config,
  logger,
});

export { serverApplication };
