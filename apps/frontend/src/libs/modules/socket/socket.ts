import { io } from 'socket.io-client';
import { config } from '../config/config.js';

const socket = io(config.ENV.API.ORIGIN_URL, {
  autoConnect: false,
});

export { socket };
