import {
  type Express as Application,
  type Request,
  type Response,
} from 'express';

import { ApiPath } from '~/libs/enums/enums.js';
import { asyncHandler } from '~/libs/helpers/helpers.js';
import { type Controller } from '~/libs/types/types.js';

import { HTTPCode } from '~/libs/modules/http/http.js';

import { requireAuth } from '~/middlewares/require-auth/require-auth.js';

import { type ChatMessagesService } from './chat-messages.service.js';

class ChatMessagesController implements Controller {
  private chatMessagesService: ChatMessagesService;

  public constructor({
    chatMessagesService,
  }: {
    chatMessagesService: ChatMessagesService;
  }) {
    this.chatMessagesService = chatMessagesService;
  }

  public init(app: Application) {
    app.post(
      ApiPath.CHAT_MESSAGE,
      requireAuth,
      asyncHandler(async (request: Request, response: Response) => {
        const res = await this.chatMessagesService.create(request.body);

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
