import jwt from 'jsonwebtoken';

import { type JsonWebToken } from './libs/types/types.js';

class BaseJsonWebToken implements JsonWebToken {
  private secret: string;

  public constructor({ secret }: { secret: string }) {
    this.secret = secret;
  }

  public decode(payload: string): string {
    return jwt.verify(payload, this.secret) as string;
  }

  public sign(payload: string): string {
    return jwt.sign(payload, this.secret);
  }
}

export { BaseJsonWebToken };
