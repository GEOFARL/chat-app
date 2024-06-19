import { type CreateChatMessageRequestDto } from '~/modules/chat-messages/chat-messages.js';
import { type ChatBot } from '../types/types.js';

class EchoChatBot implements ChatBot {
  public async handleResponse(
    message: CreateChatMessageRequestDto
  ): Promise<CreateChatMessageRequestDto> {
    return {
      message: message.message,
      receiverUserId: message.senderUserId,
      senderUserId: message.receiverUserId,
    };
  }
}

export { EchoChatBot };
