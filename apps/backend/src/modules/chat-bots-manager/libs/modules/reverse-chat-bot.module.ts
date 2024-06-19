import { type CreateChatMessageRequestDto } from '~/modules/chat-messages/chat-messages.js';
import { type ChatBot } from '../types/types.js';
import { reverseString, wait } from '../helpers/helpers.js';

class ReverseChatBot implements ChatBot {
  async handleResponse(
    message: CreateChatMessageRequestDto
  ): Promise<CreateChatMessageRequestDto> {
    await wait(3000);
    return {
      message: reverseString(message.message),
      receiverUserId: message.senderUserId,
      senderUserId: message.receiverUserId,
    };
  }
}

export { ReverseChatBot };
