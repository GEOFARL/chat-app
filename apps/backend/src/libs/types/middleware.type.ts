import { type Express as Application } from 'express';

type Middleware = {
  init: (app: Application) => void;
};

export { type Middleware };
