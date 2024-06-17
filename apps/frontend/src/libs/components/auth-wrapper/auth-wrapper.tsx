import { ReactNode } from 'react';
import { Header } from '../header/header.tsx';
import { useUser } from '~/libs/hooks/hooks.js';
import { Loader } from '../loader/loader.tsx';

type Properties = {
  children: ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }) => {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 grid place-content-center">
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grey min-h-screen">
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export { AuthWrapper };
