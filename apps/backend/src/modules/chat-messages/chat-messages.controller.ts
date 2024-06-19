import {
  type Request,
  type Response,
  type Express as Application,
} from 'express';

import { ApiPath } from '~/libs/enums/enums.js';
import { type Controller } from '~/libs/types/types.js';
import { asyncHandler } from '~/libs/helpers/helpers.js';

import { HTTPCode } from '~/libs/modules/http/http.js';
import { type Socket } from '~/libs/modules/socket/socket.js';

import { requireAuth } from '~/middlewares/require-auth/require-auth.js';

import { type ChatMessagesService } from './chat-messages.service.js';
import { type CreateChatMessageRequestDto } from './libs/types/types.js';

class ChatMessagesController implements Controller {
  private chatMessagesService: ChatMessagesService;

  private socket: Socket;

  public constructor({
    chatMessagesService,
    socket,
  }: {
    chatMessagesService: ChatMessagesService;
    socket: Socket;
  }) {
    this.chatMessagesService = chatMessagesService;
    this.socket = socket;
  }

  public init(app: Application) {
    app.post(
      ApiPath.CHAT_MESSAGE,
      requireAuth,
      asyncHandler(async (request: Request, response: Response) => {
        const res = await this.chatMessagesService.create(request.body);

        this.socket.emit({
          to: (request.body as CreateChatMessageRequestDto).receiverUserId,
          message: res,
        });

        response.status(HTTPCode.CREATED).json(res);
      })
    );

    app.get(
      ApiPath.CHAT_MESSAGES_$USER_ID,
      requireAuth,
      asyncHandler(async (request: Request, response: Response) => {
        const res = await this.chatMessagesService.findAll(
          request.user!.id,
          request.params['userId']!
        );

        response.status(HTTPCode.OK).json(res);
      })
    );
  }

  public get name(): string {
    return 'Chat Messages';
  }
}

export { ChatMessagesController };
