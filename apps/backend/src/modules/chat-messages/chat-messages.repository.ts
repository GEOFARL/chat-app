import { db } from '~/libs/modules/db/db.js';
import { type MessageDto, type AddChatMessageDto } from './libs/types/types.js';

class ChatMessagesRepository {
  public async create(newMessage: AddChatMessageDto): Promise<MessageDto> {
    return db.message.create({
      data: newMessage,
    });
  }

  public async findAll(chatId: string): Promise<MessageDto[]> {
    return db.message.findMany({
      where: {
        chatId,
      },
    });
  }
}

export { ChatMessagesRepository };
