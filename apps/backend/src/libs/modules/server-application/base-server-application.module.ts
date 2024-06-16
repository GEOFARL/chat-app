import express, { type Express as Application } from 'express';
import { type Server, createServer } from 'http';

import { type Controller, type Middleware } from '~/libs/types/types.js';

import { type Config } from '../config/config.js';
import { type Logger } from '../logger/logger.js';

type Constructor = {
  config: Config;
  logger: Logger;
};

class BaseServerApplication {
  private app: Application;

  private httpServer: Server;

  private config: Config;

  private logger: Logger;

  constructor({ config, logger }: Constructor) {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.config = config;
    this.logger = logger;
  }

  public initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      controller.init(this.app);
    });
  }

  public initMiddlewares(middlewares: Middleware[]) {
    this.app.use(express.json());

    middlewares.forEach((middleware) => {
      middleware.init(this.app);
    });
  }

  public initErrorHandler(middleware: Middleware) {
    middleware.init(this.app);
  }

  public initNotFoundHandler(middleware: Middleware) {
    middleware.init(this.app);
  }

  public start() {
    this.httpServer.listen(
      this.config.ENV.APP.PORT,
      this.config.ENV.APP.HOST,
      () => {
        this.logger.info(
          `The server is started on ${this.config.ENV.APP.HOST}:${this.config.ENV.APP.PORT}`
        );
      }
    );
  }
}

export { BaseServerApplication };
