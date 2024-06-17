import { type Express as Application } from 'express';

type Controller = {
  init: (app: Application) => void;
  name: string;
};

export { type Controller };
