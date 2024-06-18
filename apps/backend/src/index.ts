import { serverApplication } from './libs/modules/server-application/server-application.js';

import { errorHandler } from './middlewares/error-handler/error-handler.js';
import { httpLogger } from './middlewares/http-logger/http-logger.js';
import { injectData } from './middlewares/inject-data/inject-data.js';
import { notFoundHandler } from './middlewares/not-found-handler/not-found-handler.js';
import { staticFiles } from './middlewares/static-files/static-files.js';
import { authController } from './modules/auth/auth.js';
import { userController } from './modules/user/user.js';

serverApplication.initMiddlewares([httpLogger, injectData, staticFiles]);

serverApplication.initControllers([authController, userController]);

serverApplication.initErrorHandler(errorHandler);

serverApplication.initNotFoundHandler(notFoundHandler);

serverApplication.start();
