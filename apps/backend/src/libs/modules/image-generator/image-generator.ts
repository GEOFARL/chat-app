import { config } from '../config/config.js';
import { BaseImageGenerator } from './base-image-generator.module.js';

const imageGenerator = new BaseImageGenerator({
  imagesLocation: config.ENV.IMAGES.STORAGE_PATH,
});

export { imageGenerator };
export { type ImageGenerator } from './libs/types/types.js';
