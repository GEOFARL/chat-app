const SocketEvent = {
  CONNECT: 'connect',
  CONNECTION: 'connection',
  LOGIN: 'login',
  LOGOUT: 'logout',
  DISCONNECT: 'disconnect',
  USERS_ONLINE: 'users:online',
  MESSAGE_NEW: 'message:new',
  START_TYPING: 'typing:start',
  STOP_TYPING: 'typing:stop',
} as const;

export { SocketEvent };
