import { type UserDto } from '~/modules/user/user.js';
import { type CreateChatMessageRequestDto } from '~/modules/chat-messages/chat-messages.js';

type ChatBotsManager = {
  handleBotResponse: (
    message: CreateChatMessageRequestDto,
    bot: UserDto
  ) => void;
};

export { type ChatBotsManager };
