import { type ChatDto } from './libs/types/types.js';
import { type ChatsRepository } from './chats.repository.js';

class ChatsService {
  private chatsRepository: ChatsRepository;

  public constructor({
    chatsRepository,
  }: {
    chatsRepository: ChatsRepository;
  }) {
    this.chatsRepository = chatsRepository;
  }

  public async findChat(
    userId1: string,
    userId2: string
  ): Promise<ChatDto | null> {
    return this.chatsRepository.findChat(userId1, userId2);
  }

  create(userId1: string, userId2: string): Promise<ChatDto> {
    return this.chatsRepository.create(userId1, userId2);
  }
}

export { ChatsService };
