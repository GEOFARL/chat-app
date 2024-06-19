import { type MessageDto } from '~/modules/chat-messages/chat-messages.js';
import { type Server } from 'http';

type Socket = {
  init: ({ httpServer }: { httpServer: Server }) => void;
  emit: ({ to, message }: { to: string; message: MessageDto }) => void;
};

export { type Socket };
