import { type Server } from 'http';

import { type ValueOf } from '~/libs/types/types.js';

import { SocketEvent } from '../enums/enums.js';

type Socket = {
  init: ({ httpServer }: { httpServer: Server }) => void;
};

export { type Socket };
