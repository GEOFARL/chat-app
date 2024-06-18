import defaultAvatar from '~/assets/images/default-avatar.png';

import styles from './styles.module.css';

import { Button, Card, Image } from '~/libs/components/components.js';
import { AppRoute, CookieName, QueryKey } from '~/libs/enums/enums.js';
import { getImageUrl, getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useCookies,
  useNavigate,
  useOutside,
  useQueryClient,
  useState,
  useUser,
} from '~/libs/hooks/hooks.js';
import {
  NotificationMessage,
  notification,
} from '~/libs/modules/notification/notification.js';

const Profile: React.FC = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const removeCookie = useCookies([CookieName.TOKEN])[2];
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLoggedIn = Boolean(user);

  const handleOpen = useCallback(() => {
    setIsOpen((p) => !p);
  }, []);

  const handleLogout = useCallback(() => {
    queryClient.setQueryData([QueryKey.USER], null);
    removeCookie(CookieName.TOKEN);
    setIsOpen(false);
    notification.success(NotificationMessage.SIGNED_OUT_SUCCESSFULLY);
    navigate(AppRoute.ROOT);
  }, [removeCookie, queryClient, navigate]);

  const modalRef = useOutside({ isOpen, onClose: () => setIsOpen(false) });

  return (
    <div className="relative z-50">
      <button onClick={handleOpen}>
        <Image
          src={user?.imageName ? getImageUrl(user.imageName) : defaultAvatar}
          alt="user avatar"
          className="w-10 h-10"
        />
      </button>

      {isOpen && (
        <Card
          className={getValidClassNames(
            'absolute flex flex-col items-start gap-2 top-[52px] right-[10px]',
            isOpen && styles['modal-open']
          )}
          ref={modalRef}
        >
          {isLoggedIn ? (
            <>
              <div>
                <p className="font-semibold text-nowrap max-w-[20ch] overflow-hidden text-ellipsis">
                  {user?.fullName}
                </p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <Button
                label="Log Out"
                size="sm"
                className="text-nowrap w-full"
                onClick={handleLogout}
              />
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
