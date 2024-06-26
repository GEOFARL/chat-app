import { AppEnvironment } from '~/libs/enums/enums.js';
import { ValueOf } from '~/libs/types/types.js';

import { EnvironmentSchema } from './libs/types/types.js';

class BaseConfig {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return {
      API: {
        ORIGIN_URL: import.meta.env['VITE_APP_API_ORIGIN_URL'] as string,
      },
      APP: {
        ENVIRONMENT: import.meta.env['VITE_APP_NODE_ENV'] as ValueOf<
          typeof AppEnvironment
        >,
      },
    };
  }
}

export { BaseConfig };
