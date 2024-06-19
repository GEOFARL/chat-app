import {
  type CreateChatMessageRequestDto,
  type MessageDto,
} from './libs/types/types.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { type HTTP } from '~/libs/modules/http/http.js';

class ChatMessagesApi {
  private http: HTTP;

  private baseUrl: string;

  public constructor({ http, baseUrl }: { http: HTTP; baseUrl: string }) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  public async getMessages(userId: string): Promise<MessageDto[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.load(
      this.baseUrl + ApiPath.CHAT_MESSAGES_$USER_ID.replace(':userId', userId),
      {
        headers,
        method: 'GET',
        payload: null,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }

  public async sendMessage(
    payload: CreateChatMessageRequestDto
  ): Promise<MessageDto> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.load(this.baseUrl + ApiPath.CHAT_MESSAGE, {
      headers,
      method: 'POST',
      payload: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }
}

export { ChatMessagesApi };
