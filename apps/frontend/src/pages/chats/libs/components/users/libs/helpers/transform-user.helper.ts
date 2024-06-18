import { getImageUrl } from '~/libs/helpers/helpers.js';
import { type AuthResponseDto } from '~/modules/auth/auth.js';
import { type User } from '~/pages/chats/libs/types/types.js';

const transformUser = (user: AuthResponseDto['user']): User => {
  return {
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque repellendus minima accusamus quidem pariatur earum quae fugiat maxime id, repudiandae architecto reiciendis vero praesentium perferendis officiis officia dolorum ullam! Nostrum, magnam voluptatum harum fuga animi illum dolore enim eaque itaque, ex doloribus nulla? Nihil, dolore officiis? Quibusdam animi earum nesciunt.',
    id: user.id,
    imageUrl: getImageUrl(user.imageName),
    name: user.fullName,
  };
};

export { transformUser };
