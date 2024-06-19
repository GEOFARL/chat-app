import { socket } from '~/libs/modules/socket/socket.js';

import { chatsService } from '../chats/chats.js';
import { ChatMessagesController } from './chat-messages.controller.js';
import { ChatMessagesRepository } from './chat-messages.repository.js';
import { ChatMessagesService } from './chat-messages.service.js';

const chatMessagesRepository = new ChatMessagesRepository();

const chatMessagesService = new ChatMessagesService({
  chatMessagesRepository,
  chatsService,
});

const chatMessagesController = new ChatMessagesController({
  chatMessagesService,
  socket,
});

export { chatMessagesController };
export { type MessageDto } from './libs/types/types.js';
