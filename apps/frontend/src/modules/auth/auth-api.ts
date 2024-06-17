import {
  type UserSignUpRequestDto,
  type UserSignInRequestDto,
} from '~/modules/user/user.js';
import { type AuthResponseDto } from './libs/types/types.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { type HTTP } from '~/libs/modules/http/http.js';

class AuthApi {
  private http: HTTP;

  private baseUrl: string;

  public constructor({ http, baseUrl }: { http: HTTP; baseUrl: string }) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  public async signIn(payload: UserSignInRequestDto): Promise<AuthResponseDto> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.load(this.baseUrl + ApiPath.SIGN_IN, {
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

  public async signUp(payload: UserSignUpRequestDto): Promise<AuthResponseDto> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.load(this.baseUrl + ApiPath.SIGN_UP, {
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

  public async getUser(): Promise<AuthResponseDto['user']> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.load(this.baseUrl + ApiPath.USER, {
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

export { AuthApi };
