import { QueryKey } from '~/libs/enums/enums.js';
import { useQuery } from '~/libs/hooks/hooks.js';
import { authApi } from '~/modules/auth/auth.js';

const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: [QueryKey.USER],
    queryFn: () => authApi.getUser(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { user, isLoading };
};

export { useUser };
