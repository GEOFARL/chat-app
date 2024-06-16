import { ApplicationError } from '../../../../../exceptions/exceptions.js';
import { type ValueOf } from '../../../../../types/types.js';
import { HTTPCode } from '../../enums/enums.js';

type Constructor = {
  message: string;
  status: ValueOf<typeof HTTPCode>;
};

class HTTPError extends ApplicationError {
  public status: ValueOf<typeof HTTPCode>;

  public constructor({ message, status }: Constructor) {
    super({
      message,
    });

    this.status = status;
  }
}

export { HTTPError };
