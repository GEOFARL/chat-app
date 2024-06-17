import { HTTPCode } from '~/libs/modules/http/http.js';
import {
  type ErrorDto,
  ExceptionMessage,
} from '~/libs/exceptions/exceptions.js';
import { type NextFunction, type Request, type Response } from 'express';

const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.user) {
    return response.status(HTTPCode.UNAUTHORIZED).json({
      message: ExceptionMessage.UNAUTHORIZED,
      status: HTTPCode.UNAUTHORIZED,
    } as ErrorDto);
  }

  next();
};

export { requireAuth };
