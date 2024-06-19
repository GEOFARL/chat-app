import { serverApplication } from './libs/modules/server-application/server-application.js';
import { socket } from './libs/modules/socket/socket.js';

import { errorHandler } from './middlewares/error-handler/error-handler.js';
import { httpLogger } from './middlewares/http-logger/http-logger.js';
import { injectData } from './middlewares/inject-data/inject-data.js';
import { notFoundHandler } from './middlewares/not-found-handler/not-found-handler.js';
import { staticFiles } from './middlewares/static-files/static-files.js';
import { authController } from './modules/auth/auth.js';
import { chatMessagesController } from './modules/chat-messages/chat-messages.js';
import { userController } from './modules/user/user.js';
import { chatBotsManager } from './modules/chat-bots-manager/chat-bots-manager.js';
chatBotsManager;

serverApplication.initSocket(socket);

serverApplication.initMiddlewares([httpLogger, injectData, staticFiles]);

serverApplication.initControllers([
  authController,
  userController,
  chatMessagesController,
]);

serverApplication.initErrorHandler(errorHandler);

serverApplication.initNotFoundHandler(notFoundHandler);

serverApplication.start();
