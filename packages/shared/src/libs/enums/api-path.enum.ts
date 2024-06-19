const ApiPath = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  USER: '/user',
  USERS: '/users',
  CHAT_MESSAGE: '/chat-message',
  CHAT_MESSAGES_$USER_ID: '/chat-messages/:userId',
} as const;

export { ApiPath };
