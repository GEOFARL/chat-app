import { type ReactNode } from 'react';

import { AppRoute } from '~/libs/enums/enums.js';
import {
  useLocation,
  useNavigate,
  useUser,
  useEffect,
} from '~/libs/hooks/hooks.js';

import { Container } from '~/libs/components/components.js';
import { SignInForm, SignUpForm } from './components/components.js';

const Auth: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(AppRoute.ROOT);
    }
  }, [isLoggedIn, navigate]);

  const handleScreenRender = (screen: string): ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm />;
      }

      case AppRoute.SIGN_UP: {
        return <SignUpForm />;
      }
    }

    return null;
  };

  return (
    <div className="bg-white md:bg-grey min-h-screen">
      <div className="flex flex-col justify-center pt-16 pb-16 md:pt-44 md:pb-20">
        <Container className="w-full md:w-auto">
          {handleScreenRender(pathname)}
        </Container>
      </div>
    </div>
  );
};

export { Auth };
