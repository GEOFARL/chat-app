import { config } from '~/libs/modules/config/config.js';
import { BaseStaticFiles } from './base-static-files.middleware';

const staticFiles = new BaseStaticFiles({
  imagesStoragePath: config.ENV.IMAGES.STORAGE_PATH,
});

export { staticFiles };
