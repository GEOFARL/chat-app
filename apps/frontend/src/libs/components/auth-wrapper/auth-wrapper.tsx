import { ReactNode } from 'react';
import { Header } from '../header/header.tsx';

type Properties = {
  children: ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }) => {
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
