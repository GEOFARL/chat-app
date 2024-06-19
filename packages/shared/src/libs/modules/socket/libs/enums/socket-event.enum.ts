const SocketEvent = {
  CONNECT: 'connect',
  CONNECTION: 'connection',
  LOGIN: 'login',
  LOGOUT: 'logout',
  DISCONNECT: 'disconnect',
  USERS_ONLINE: 'users:online',
} as const;

export { SocketEvent };
