import { forwardRef, type ReactNode } from 'react';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  children: ReactNode;
  className?: string | undefined;
};

const Card = forwardRef<HTMLDivElement, Properties>(
  ({ children, className }, ref) => {
    return (
      <div
        className={getValidClassNames(
          'flex flex-col items-center p-6 rounded-md drop-shadow-md bg-white',
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export { Card };
