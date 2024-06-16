import { AppRoute } from '~/libs/enums/enums.ts';

import { NavigationItem } from '../navigation-item/navigation-item.tsx';

const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center">
      <ul className="flex flex-row items-center gap-8">
        <NavigationItem to={AppRoute.ROOT} label="Home" />
        <NavigationItem to={AppRoute.CHATS} label="Chats" />
      </ul>
    </nav>
  );
};

export { Navigation };
