import { type Encrypt } from '~/libs/modules/encrypt/encrypt.js';
import { type JsonWebToken } from '~/libs/modules/jsonwebtoken/jsonwebtoken.js';
import { HTTPCode, HTTPError } from '~/libs/modules/http/http.js';
import { ExceptionMessage } from '~/libs/exceptions/exceptions.js';

import {
  type UserService,
  type UserSignUpRequestDto,
  type UserSignInRequestDto,
  UserExceptionMessage,
  UserDto,
} from '~/modules/user/user.js';
import { type AuthResponseDto } from './libs/types/types.js';

type Constructor = {
  jsonWebToken: JsonWebToken;
  encrypt: Encrypt;
  userService: UserService;
};

class AuthService {
  private jsonWebToken: JsonWebToken;

  private encrypt: Encrypt;

  private userService: UserService;

  public constructor({ jsonWebToken, encrypt, userService }: Constructor) {
    this.jsonWebToken = jsonWebToken;
    this.encrypt = encrypt;
    this.userService = userService;
  }

  public findByToken(token: string): Promise<UserDto | null> {
    const id = this.jsonWebToken.decode(token);
    return this.userService.findById(id);
  }

  public async signUp(user: UserSignUpRequestDto): Promise<AuthResponseDto> {
    const existingUser = await this.userService.findByEmail(user.email);

    if (existingUser) {
      throw new HTTPError({
        message: UserExceptionMessage.EMAIL_IS_TAKEN,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    const { hash } = await this.encrypt.encrypt(user.password);
    const userWithHash: UserSignUpRequestDto = { ...user, password: hash };

    const createdUser = await this.userService.create(userWithHash);

    if (!createdUser) {
      throw new HTTPError({
        message: ExceptionMessage.SOMETHING_WENT_WRONG,
        status: HTTPCode.INTERNAL_SERVER_ERROR,
      });
    }

    const token = this.jsonWebToken.sign(String(createdUser.id));

    const { password, ...userWithoutPassword } = createdUser;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  public async signIn(user: UserSignInRequestDto): Promise<AuthResponseDto> {
    const loggedInUser = await this.userService.findByEmail(user.email);

    if (!loggedInUser) {
      throw new HTTPError({
        message: UserExceptionMessage.NOT_FOUND,
        status: HTTPCode.NOT_FOUND,
      });
    }

    const hasMatchingPassword = await this.encrypt.compare({
      password: user.password,
      passwordHash: loggedInUser.password,
    });

    if (!hasMatchingPassword) {
      throw new HTTPError({
        message: UserExceptionMessage.INCORRECT_CREDENTIALS,
        status: HTTPCode.UNAUTHORIZED,
      });
    }

    const token = this.jsonWebToken.sign(String(loggedInUser.id));

    const { password, ...userWithoutPassword } = loggedInUser;

    return {
      token,
      user: userWithoutPassword,
    };
  }
}

export { AuthService };
