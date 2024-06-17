import { BeatLoader } from 'react-spinners';

import { type LoaderSize } from './libs/types/types.js';
import { sizeMap } from './libs/maps/maps.js';

type Properties = {
  size?: LoaderSize;
};

const Loader: React.FC<Properties> = ({ size = 'md' }) => {
  return <BeatLoader size={sizeMap[size]} />;
};

export { Loader };
