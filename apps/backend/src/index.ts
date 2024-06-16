import express from 'express';
import { createServer } from 'http';

const PORT = 3001;

const app = express();

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log('Server is running on the port', PORT);
});
