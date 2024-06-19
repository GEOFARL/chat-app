import { useEffect, useQuery } from '~/libs/hooks/hooks.js';
import { ContactList, SearchForm, Tabs } from './libs/components/components.js';
import { QueryKey } from '~/libs/enums/enums.js';
import { userApi } from '~/modules/user/user.js';
import { Loader } from '~/libs/components/components.js';
import { useStore } from '../../hooks/hooks.js';
import { transformUser } from '../../helpers/helpers.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { forwardRef } from 'react';

type Properties = {
  isOpened: boolean;
  onClick: () => void;
};

const Users = forwardRef<HTMLDivElement, Properties>(
  ({ isOpened, onClick }, ref) => {
    const setUsers = useStore((state) => state.setUsers);
    const { data: users, isLoading } = useQuery({
      queryKey: [QueryKey.USERS],
      queryFn: () => userApi.getUsers(),
    });

    useEffect(() => {
      if (users) {
        setUsers(users?.map(transformUser));
      }
    }, [users, setUsers]);

    return (
      <div
        className={getValidClassNames(
          'w-[275px] bg-white rounded-e-md fixed md:static top-[70px] -right-[275px] flex-col md:flex z-10 transition-all duration-300',
          isOpened && 'right-[10px] '
        )}
        ref={ref}
      >
        <Tabs />

        {isLoading ? (
          <div className="flex-1 grid place-content-center">
            <div>
              <Loader />
            </div>
          </div>
        ) : (
          <ContactList onClick={onClick} />
        )}

        <SearchForm />
      </div>
    );
  }
);

export { Users };
