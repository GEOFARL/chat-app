import {
  MessageEvent,
  chatMessagesService,
  type CreateChatMessageRequestDto,
} from '~/modules/chat-messages/chat-messages.js';
import { userService, type UserDto } from '~/modules/user/user.js';

import {
  EchoChatBot,
  IgnoreChatBot,
  ReverseChatBot,
  SpamChatBot,
} from './libs/modules/modules.js';
import {
  type BotFullName,
  type ChatBot,
  type ChatBotsManager,
} from './libs/types/types.js';

import { type EventEmitter } from 'node:events';

class BaseChatBotsManager implements ChatBotsManager {
  private bots: Record<BotFullName, ChatBot>;

  private messageEventEmitter: EventEmitter;

  public constructor({
    messageEventEmitter,
  }: {
    messageEventEmitter: EventEmitter;
  }) {
    this.messageEventEmitter = messageEventEmitter;
    this.bots = {
      'Echo Bot': new EchoChatBot(),
      'Ignore Bot': new IgnoreChatBot(),
      'Reverse Bot': new ReverseChatBot(),
      'Spam Bot': new SpamChatBot({
        chatMessagesService,
        userService,
      }),
    };

    this.messageEventEmitter.on(
      MessageEvent.BOT_REQUESTED,
      this.handleBotResponse.bind(this)
    );
  }

  public async handleBotResponse(
    message: CreateChatMessageRequestDto,
    bot: UserDto
  ): Promise<void> {
    const botHandler = this.bots[bot.fullName as BotFullName];

    if (botHandler) {
      const responseMessage = await botHandler.handleResponse(message);

      if (responseMessage) {
        this.messageEventEmitter.emit(
          MessageEvent.BOT_RESPONDED,
          responseMessage
        );
      }
    }
  }
}

export { BaseChatBotsManager };
