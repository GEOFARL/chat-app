import defaultAvatar from '~/assets/images/default-avatar.png';

import { Navigation } from './libs/components/components.ts';

import { Image } from '../image/image.tsx';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-black flex items-center">
      <div className="mx-auto max-w-7xl flex justify-between w-full px-10">
        <Navigation />
        <Image src={defaultAvatar} alt="user avatar" className="w-10 h-10" />
      </div>
    </header>
  );
};

export { Header };
