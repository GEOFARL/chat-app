import express, { type Express as Application } from 'express';
import { type Server, createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { type Controller, type Middleware } from '~/libs/types/types.js';

import { type Config } from '../config/config.js';
import { type Logger } from '../logger/logger.js';
import { type Socket } from '../socket/socket.js';

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
      this.logger.info(`${controller.name} controller is initialized`);
    });
  }

  public initMiddlewares(middlewares: Middleware[]) {
    this.app.use(
      cors({
        origin: this.config.ENV.APP.CLIENT_ORIGIN,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());

    middlewares.forEach((middleware) => {
      middleware.init(this.app);
      this.logger.info(`${middleware.name} middleware is initialized`);
    });
  }

  public initErrorHandler(middleware: Middleware) {
    middleware.init(this.app);
    this.logger.info(`${middleware.name} middleware is initialized`);
  }

  public initNotFoundHandler(middleware: Middleware) {
    middleware.init(this.app);
    this.logger.info(`${middleware.name} middleware is initialized`);
  }

  public initSocket(socket: Socket) {
    socket.init({ httpServer: this.httpServer });
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
