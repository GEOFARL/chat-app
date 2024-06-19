import { type ChatDto } from './libs/types/types.js';
import { db } from '~/libs/modules/db/db.js';

class ChatsRepository {
  public async findChat(
    userId1: string,
    userId2: string
  ): Promise<ChatDto | null> {
    return db.chat.findFirst({
      where: {
        OR: [
          {
            receiverUserId: userId1,
            senderUserId: userId2,
          },
          {
            receiverUserId: userId2,
            senderUserId: userId1,
          },
        ],
      },
    });
  }

  public async create(userId1: string, userId2: string): Promise<ChatDto> {
    return db.chat.create({
      data: {
        receiverUserId: userId1,
        senderUserId: userId2,
      },
    });
  }
}

export { ChatsRepository };
