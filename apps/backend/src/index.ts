import { serverApplication } from './libs/modules/server-application/server-application.js';

import { errorHandler } from './middlewares/error-handler/error-handler.js';
import { httpLogger } from './middlewares/http-logger/http-logger.js';
import { notFoundHandler } from './middlewares/not-found-handler/not-found-handler.js';

serverApplication.initMiddlewares([httpLogger]);

serverApplication.initControllers([]);

serverApplication.initErrorHandler(errorHandler);

serverApplication.initNotFoundHandler(notFoundHandler);

serverApplication.start();
