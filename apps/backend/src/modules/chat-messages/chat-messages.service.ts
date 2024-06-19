import {
  type MessageDto,
  type CreateChatMessageRequestDto,
  type AddChatMessageDto,
} from './libs/types/types.js';
import { type ChatMessagesRepository } from './chat-messages.repository.js';
import { type ChatsService } from '../chats/chats.js';
import { type ChatDto } from '../chats/chats.js';

class ChatMessagesService {
  private chatMessagesRepository: ChatMessagesRepository;

  private chatsService: ChatsService;

  public constructor({
    chatMessagesRepository,
    chatsService,
  }: {
    chatMessagesRepository: ChatMessagesRepository;
    chatsService: ChatsService;
  }) {
    this.chatMessagesRepository = chatMessagesRepository;
    this.chatsService = chatsService;
  }

  public async create(
    newMessage: CreateChatMessageRequestDto
  ): Promise<MessageDto> {
    const { receiverUserId, senderUserId, message } = newMessage;

    const existingChat = await this.chatsService.findChat(
      senderUserId,
      receiverUserId
    );

    let chat: ChatDto;

    if (!existingChat) {
      chat = await this.chatsService.create(senderUserId, receiverUserId);
    } else {
      chat = existingChat;
    }

    const messageDto: AddChatMessageDto = {
      chatId: chat.id,
      content: message,
      userId: senderUserId,
    };

    return this.chatMessagesRepository.create(messageDto);
  }

  public async findAll(
    userId1: string,
    userId2: string
  ): Promise<MessageDto[]> {
    const chat = await this.chatsService.findChat(userId1, userId2);

    if (!chat) {
      return [];
    }

    return this.chatMessagesRepository.findAll(chat.id);
  }
}

export { ChatMessagesService };
