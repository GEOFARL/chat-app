const SocketEvent = {
  CONNECT: 'connect',
  CONNECTION: 'connection',
  LOGIN: 'login',
  LOGOUT: 'logout',
  DISCONNECT: 'disconnect',
  USERS_ONLINE: 'users:online',
  MESSAGE_NEW: 'message:new',
} as const;

export { SocketEvent };
