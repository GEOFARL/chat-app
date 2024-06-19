import { config } from '~/libs/modules/config/config.js';
import { http } from '~/libs/modules/http/http.js';

import { ChatMessagesApi } from './chat-messages-api.js';

const chatMessagesApi = new ChatMessagesApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
});

export { chatMessagesApi };
export { type MessageDto } from './libs/types/types.js';
