import { User } from '../types/types.js';

import echo from '~/assets/images/echo.png';
import reverse from '~/assets/images/reverse.png';
import spam from '~/assets/images/spam.png';
import ignore from '~/assets/images/ignore.png';

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam laboriosam iusto repudiandae ratione doloribus adipisci earum nemo corrupti consequatur placeat modi nobis ea, aut culpa? Modi quos iusto impedit!';

const DEFAULT_USERS: User[] = [
  {
    id: '1',
    name: 'Echo Bot',
    imageUrl: echo,
    description: DEFAULT_DESCRIPTION,
  },
  {
    id: '2',
    name: 'Reverse Bot',
    imageUrl: reverse,
    description: DEFAULT_DESCRIPTION,
  },
  {
    id: '3',
    name: 'Spam Bot',
    imageUrl: spam,
    description: DEFAULT_DESCRIPTION,
  },
  {
    id: '4',
    name: 'Ignore Bot',
    imageUrl: ignore,
    description: DEFAULT_DESCRIPTION,
  },
];

export { DEFAULT_USERS };
