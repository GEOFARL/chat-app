import { config } from '~/libs/modules/config/config.js';
import { UserApi } from './user-api.js';
import { http } from '~/libs/modules/http/http.js';

export {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from './libs/types/types.js';

const userApi = new UserApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
});

export { userApi };
