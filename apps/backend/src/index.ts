import { serverApplication } from './libs/modules/server-application/server-application.js';

import { errorHandler } from './middlewares/error-handler/error-handler.js';
import { httpLogger } from './middlewares/http-logger/http-logger.js';
import { injectData } from './middlewares/inject-data/inject-data.js';
import { notFoundHandler } from './middlewares/not-found-handler/not-found-handler.js';
import { authController } from './modules/auth/auth.js';

serverApplication.initMiddlewares([httpLogger, injectData]);

serverApplication.initControllers([authController]);

serverApplication.initErrorHandler(errorHandler);

serverApplication.initNotFoundHandler(notFoundHandler);

serverApplication.start();
