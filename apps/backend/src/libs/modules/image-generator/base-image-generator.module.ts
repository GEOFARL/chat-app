import { writeFile } from 'fs';
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import { randomUUID } from 'crypto';
import { join } from 'path';

import { type ImageGenerator } from './libs/types/types.js';

class BaseImageGenerator implements ImageGenerator {
  private imagesLocation: string;

  public constructor({ imagesLocation }: { imagesLocation: string }) {
    this.imagesLocation = imagesLocation;
  }

  public async generateImage(seed: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = createAvatar(botttsNeutral, {
        seed,
        size: 96,
      }).toString();

      const fileName = `image-${new Date()
        .toISOString()
        .slice(0, 19)}-${randomUUID().slice(0, 4)}.svg`;

      const fileLocation = join(this.imagesLocation, fileName);

      writeFile(fileLocation, image, (error) => {
        if (error) {
          reject(error);
        }

        resolve(fileName);
      });
    });
  }
}

export { BaseImageGenerator };
