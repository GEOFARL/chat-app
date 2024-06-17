import { config } from '~/libs/modules/config/config.js';
import { http } from '~/libs/modules/http/http.js';

import { AuthApi } from './auth-api.js';

const authApi = new AuthApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
});

export { authApi };
