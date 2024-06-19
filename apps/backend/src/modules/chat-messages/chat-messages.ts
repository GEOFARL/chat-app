import { socket } from '~/libs/modules/socket/socket.js';

import { chatsService } from '../chats/chats.js';
import { ChatMessagesController } from './chat-messages.controller.js';
import { ChatMessagesRepository } from './chat-messages.repository.js';
import { ChatMessagesService } from './chat-messages.service.js';
import { userService } from '../user/user.js';
import { messageEventEmitter } from './libs/modules/modules.js';

const chatMessagesRepository = new ChatMessagesRepository();

const chatMessagesService = new ChatMessagesService({
  chatMessagesRepository,
  chatsService,
  userService,
  socket,
  messageEventEmitter,
});

const chatMessagesController = new ChatMessagesController({
  chatMessagesService,
});

export {
  chatMessagesController,
  chatMessagesService,
  messageEventEmitter,
  type ChatMessagesService,
};
export {
  type MessageDto,
  type CreateChatMessageRequestDto,
} from './libs/types/types.js';
export { MessageEvent } from './libs/modules/modules.js';
