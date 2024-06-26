import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Logger } from '~/libs/modules/logger/logger.js';

import { type Config, type EnvironmentSchema } from './libs/types/types.js';

class BaseConfig implements Config {
  private logger: Logger;

  public ENV: EnvironmentSchema;

  public constructor(logger: Logger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => {
        this.logger.info(message);
      },
    });

    this.ENV = this.envSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  private get envSchema(): LibraryConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          default: null,
          doc: 'Application environment',
          env: 'NODE_ENV',
          format: Object.values(AppEnvironment),
        },
        HOST: {
          default: null,
          doc: 'Host for server app',
          env: 'HOST',
          format: String,
        },
        PORT: {
          default: null,
          doc: 'Port for incoming connections',
          env: 'PORT',
          format: Number,
        },
        CLIENT_ORIGIN: {
          default: null,
          doc: 'Origin of the client',
          env: 'CLIENT_ORIGIN',
          format: String,
        },
      },
      JWT: {
        SECRET: {
          default: null,
          doc: 'Secret to sign and decode jsonwebtoken',
          env: 'JWT_SECRET',
          format: String,
        },
      },
      IMAGES: {
        STORAGE_PATH: {
          default: null,
          doc: 'Path to store application images',
          format: String,
          env: 'IMAGES_STORAGE_PATH',
        },
      },
    });
  }
}

export { BaseConfig };
