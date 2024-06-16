import { type ReactNode } from 'react';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  children: ReactNode;
  className?: string | undefined;
};

const Card: React.FC<Properties> = ({ children, className }) => {
  return (
    <div
      className={getValidClassNames(
        'flex flex-col items-center p-6 rounded-md drop-shadow-md bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card };
