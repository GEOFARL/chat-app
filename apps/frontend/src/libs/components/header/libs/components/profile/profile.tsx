import defaultAvatar from '~/assets/images/default-avatar.png';

import { Button, Card, Image } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLoggedIn = false;

  const handleOpen = useCallback(() => {
    setIsOpen((p) => !p);
  }, []);

  return (
    <div className="relative">
      <button onClick={handleOpen}>
        <Image src={defaultAvatar} alt="user avatar" className="w-10 h-10" />
      </button>

      {isOpen && (
        <Card className="absolute flex flex-col items-start gap-2 top-[52px] right-[10px]">
          {isLoggedIn ? (
            <>
              <Button label="Log Out" size="sm" className="text-nowrap" />
            </>
          ) : (
            <>
              <Button
                label="Log In"
                href={AppRoute.SIGN_IN}
                size="sm"
                className="w-full"
              />
              <Button
                label="Register"
                href={AppRoute.SIGN_UP}
                size="sm"
                className="w-full"
              />
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export { Profile };
