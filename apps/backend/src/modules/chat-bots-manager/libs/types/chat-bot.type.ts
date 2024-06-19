import { type CreateChatMessageRequestDto } from '~/modules/chat-messages/chat-messages.js';

type ChatBot = {
  handleResponse: (
    message: CreateChatMessageRequestDto
  ) => Promise<CreateChatMessageRequestDto | null>;
};

export { type ChatBot };
