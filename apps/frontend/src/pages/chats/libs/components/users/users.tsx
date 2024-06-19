import { useEffect, useQuery } from '~/libs/hooks/hooks.js';
import { ContactList, SearchForm, Tabs } from './libs/components/components.js';
import { QueryKey } from '~/libs/enums/enums.js';
import { userApi } from '~/modules/user/user.js';
import { Loader } from '~/libs/components/components.js';
import { useStore } from '../../hooks/hooks.js';
import { transformUser } from '../../helpers/helpers.js';

const Users: React.FC = () => {
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
    <div className="w-[275px] bg-white rounded-e-md flex flex-col">
      <Tabs />

      {isLoading ? (
        <div className="flex-1 grid place-content-center">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <ContactList />
      )}

      <SearchForm />
    </div>
  );
};

export { Users };
