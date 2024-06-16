import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { ValueOf } from '~/libs/types/types.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  children: ReactNode;
  className?: string | undefined;
  activeClassName?: string | undefined;
};

const Link: React.FC<Properties> = ({
  to,
  children,
  className,
  activeClassName,
}) => {
  const handleLinkStyles = useCallback(
    ({ isActive }: { isActive: boolean }): string => {
      return getValidClassNames(isActive && activeClassName, className);
    },
    [activeClassName, className]
  );

  return (
    <NavLink className={handleLinkStyles} to={to}>
      {children}
    </NavLink>
  );
};

export { Link };
