import { type ChatBot } from '../types/types.js';

class IgnoreChatBot implements ChatBot {
  public async handleResponse(): Promise<null> {
    return null;
  }
}

export { IgnoreChatBot };
