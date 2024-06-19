import { useEffect, type ReactNode } from 'react';
import { AppRoute } from '~/libs/enums/enums.js';
import { useNavigate, useUser } from '~/libs/hooks/hooks.js';

type Properties = {
  page: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ page }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(AppRoute.SIGN_UP);
    }
  }, [navigate, user]);

  if (isLoading || !user) {
    return null;
  }

  return page;
};

export { ProtectedRoute };
