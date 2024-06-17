import { type Express as Application } from 'express';

type Middleware = {
  init: (app: Application) => void;
  name: string;
};

export { type Middleware };
