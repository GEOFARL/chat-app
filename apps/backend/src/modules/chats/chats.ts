import { ChatsRepository } from './chats.repository.js';
import { ChatsService } from './chats.service.js';

const chatsRepository = new ChatsRepository();

const chatsService = new ChatsService({ chatsRepository });

export { chatsService };
export { type ChatsService };
export { type ChatDto } from './libs/types/types.js';
