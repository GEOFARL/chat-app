import { type ChatMessagesRepository } from './chat-messages.repository.js';
import {
  type AddChatMessageDto,
  type CreateChatMessageRequestDto,
  type MessageDto,
} from './libs/types/types.js';

import { type ChatDto, type ChatsService } from '../chats/chats.js';
import { type UserService } from '../user/user.service.js';

import { type EventEmitter } from 'node:events';
import { type Socket } from '~/libs/modules/socket/socket.js';
import { MessageEvent } from './libs/modules/modules.js';

class ChatMessagesService {
  private chatMessagesRepository: ChatMessagesRepository;

  private chatsService: ChatsService;

  private userService: UserService;

  private socket: Socket;

  private messageEventEmitter: EventEmitter;

  public constructor({
    chatMessagesRepository,
    chatsService,
    userService,
    socket,
    messageEventEmitter,
  }: {
    chatMessagesRepository: ChatMessagesRepository;
    chatsService: ChatsService;
    userService: UserService;
    socket: Socket;
    messageEventEmitter: EventEmitter;
  }) {
    this.chatMessagesRepository = chatMessagesRepository;
    this.chatsService = chatsService;
    this.userService = userService;
    this.socket = socket;
    this.messageEventEmitter = messageEventEmitter;

    this.messageEventEmitter.on(
      MessageEvent.BOT_RESPONDED,
      (responseMessage) => {
        this.create(responseMessage);
      }
    );
  }

  public async create(
    newMessage: CreateChatMessageRequestDto
  ): Promise<MessageDto> {
    const { receiverUserId, senderUserId, message } = newMessage;

    const receivingUser = await this.userService.findById(receiverUserId);

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

    const response = await this.chatMessagesRepository.create(messageDto);

    this.socket.emit({
      to: receiverUserId,
      message: response,
    });

    if (receivingUser?.isBot) {
      this.messageEventEmitter.emit(
        MessageEvent.BOT_REQUESTED,
        newMessage,
        receivingUser
      );
    }

    return response;
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
