import { ApiPath } from '~/libs/enums/enums.js';
import { type HTTP } from '~/libs/modules/http/http.js';
import { type AuthResponseDto } from '../auth/auth.js';

class UserApi {
  private http: HTTP;

  private baseUrl: string;

  public constructor({ http, baseUrl }: { http: HTTP; baseUrl: string }) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  public async getUsers(): Promise<AuthResponseDto['user'][]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.load(this.baseUrl + ApiPath.USERS, {
      headers,
      method: 'GET',
      payload: null,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }
}

export { UserApi };
