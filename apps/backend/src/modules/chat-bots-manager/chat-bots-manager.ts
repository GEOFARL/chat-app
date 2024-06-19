import { messageEventEmitter } from '../chat-messages/chat-messages.js';
import { BaseChatBotsManager } from './base-chat-bots-manager.module.js';

const chatBotsManager = new BaseChatBotsManager({
  messageEventEmitter,
});

export { type ChatBotsManager } from './libs/types/types.js';
export { chatBotsManager };
