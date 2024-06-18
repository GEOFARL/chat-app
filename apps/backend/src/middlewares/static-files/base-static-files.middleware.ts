import express, { type Express as Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { StaticFilesPath } from '~/libs/enums/enums.js';
import { type Middleware } from '~/libs/types/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BaseStaticFiles implements Middleware {
  private imagesStoragePath: string;

  public constructor({ imagesStoragePath }: { imagesStoragePath: string }) {
    this.imagesStoragePath = imagesStoragePath;
  }

  public init(app: Application) {
    const imagesDirectory = path.join(
      __dirname,
      '../../..',
      this.imagesStoragePath
    );

    app.use(StaticFilesPath.IMAGES, express.static(imagesDirectory));
  }

  public get name(): string {
    return 'Static files';
  }
}

export { BaseStaticFiles };
