import { AppRoute } from '~/libs/enums/enums.js';

import { NavigationItem } from '../navigation-item/navigation-item.tsx';
import { useUser } from '~/libs/hooks/hooks.ts';

const Navigation: React.FC = () => {
  const { user } = useUser();

  const isLoggedIn = Boolean(user);

  return (
    <nav className="flex items-center">
      <ul className="flex flex-row items-center gap-8">
        <NavigationItem to={AppRoute.ROOT} label="Home" />
        {isLoggedIn && <NavigationItem to={AppRoute.CHATS} label="Chats" />}
      </ul>
    </nav>
  );
};

export { Navigation };
