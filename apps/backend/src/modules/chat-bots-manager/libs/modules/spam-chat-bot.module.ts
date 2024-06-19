import { randomUUID } from 'crypto';

import { type UserService } from '~/modules/user/user.js';
import { type ChatMessagesService } from '~/modules/chat-messages/chat-messages.js';

import { getRandomNumber } from '../helpers/helpers.js';
import { type ChatBot } from '../types/types.js';

class SpamChatBot implements ChatBot {
  private userService: UserService;
  private chatMessagesService: ChatMessagesService;

  public constructor({
    userService,
    chatMessagesService,
  }: {
    userService: UserService;
    chatMessagesService: ChatMessagesService;
  }) {
    this.userService = userService;
    this.chatMessagesService = chatMessagesService;
    this.initBot();
  }

  public async handleResponse(): Promise<null> {
    return null;
  }

  private async initBot() {
    const users = await this.userService.findAllUsers();
    const spamBot = await this.userService.findByEmail('spam-bot@gmail.com');
    users.forEach((user) => {
      this.chatMessagesService.create({
        message: randomUUID(),
        receiverUserId: user.id,
        senderUserId: spamBot!.id,
      });
    });

    setTimeout(() => this.initBot(), getRandomNumber(10, 120) * 1000);
  }
}

export { SpamChatBot };
