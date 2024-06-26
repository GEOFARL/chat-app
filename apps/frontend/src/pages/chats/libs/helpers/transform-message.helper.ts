import { type MessageDto } from '~/modules/chat-messages/chat-messages.js';
import { type AuthResponseDto } from '~/modules/auth/auth.js';

import { formatTime } from '~/libs/helpers/helpers.js';

import { type User, type Message } from '../types/types.js';

const transformMessage = ({
  message,
  currentUser,
  anotherUser,
  isNotMine,
}: {
  message: MessageDto;
  currentUser?: AuthResponseDto['user'];
  anotherUser: User;
  isNotMine?: boolean;
}): Message => {
  if (isNotMine) {
    return {
      author: anotherUser.name,
      message: message.content,
      time: formatTime(message.createdAt),
    };
  }

  return {
    author:
      currentUser?.id === message.userId
        ? currentUser.fullName
        : anotherUser.name,
    message: message.content,
    time: formatTime(message.createdAt),
  };
};

export { transformMessage };
