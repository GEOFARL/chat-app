import { type UserSignUpRequestDto } from './user-sign-up-request-dto.type.js';

type UserSignInRequestDto = Omit<UserSignUpRequestDto, 'fullName'>;

export { type UserSignInRequestDto };
