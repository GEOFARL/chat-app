import { ReactNode } from 'react';
import { useLocation } from '~/libs/hooks/hooks.js';
import { AppRoute } from '~/libs/enums/enums.js';

import { SignInForm, SignUpForm } from './components/components.js';

const Auth: React.FC = () => {
  const { pathname } = useLocation();

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
    <main>
      <h1>Authentication</h1>

      {handleScreenRender(pathname)}
    </main>
  );
};

export { Auth };
