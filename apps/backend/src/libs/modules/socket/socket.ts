import { onlineUsers } from '~/modules/online-users/online-users.js';
import { BaseSocket } from './base-socket.module.js';

const socket = new BaseSocket({
  onlineUsers,
});

export { socket };
export { type Socket } from './libs/types/types.js';
export { SocketEvent } from './libs/enums/enums.js';
