import { StaticFilesPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/modules/config/config.js';

const getImageUrl = (imageName: string): string => {
  return `${config.ENV.API.ORIGIN_URL}${StaticFilesPath.IMAGES}/${imageName}`;
};

export { getImageUrl };
