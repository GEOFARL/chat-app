import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    HOST: string;
    PORT: number;
    CLIENT_ORIGIN: string;
  };
  JWT: {
    SECRET: string;
  };
};

export { type EnvironmentSchema };
