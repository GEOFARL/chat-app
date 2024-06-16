import { type ReactNode } from 'react';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  children: ReactNode;
  className?: string | undefined;
};

const Container: React.FC<Properties> = ({ children, className }) => {
  return (
    <main className={getValidClassNames('mx-auto max-w-7xl', className)}>
      {children}
    </main>
  );
};

export { Container };
