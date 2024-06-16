import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type IconName, type ValueOf } from '~/libs/types/types.js';

import { Link } from '../link/link.tsx';
import { Icon } from '../icon/icon.tsx';

import { ButtonStyle } from './libs/types/types.js';

type Properties = {
  className?: string | undefined;
  href?: ValueOf<typeof AppRoute>;
  label: string;
  iconName?: IconName;
  iconClassName?: string | undefined;
  buttonStyle?: ButtonStyle;
  activeClassName?: string | undefined;
};

const Button: React.FC<Properties> = ({
  className,
  href,
  label,
  iconName,
  iconClassName,
  activeClassName,
  buttonStyle = 'button',
}) => {
  const buttonStyles = getValidClassNames(
    'flex flex-row items-center gap-2 text-lg',
    buttonStyle === 'button' &&
      'bg-white px-6 py-2 rounded-md hover:opacity-80 active:opacity-60',
    buttonStyle === 'link' && 'hover:underline',
    className
  );

  const icon = iconName ? (
    <Icon className={iconClassName} name={iconName} />
  ) : null;

  return (
    <>
      {href ? (
        <Link
          className={buttonStyles}
          to={href}
          activeClassName={activeClassName ?? ''}
        >
          <span>{label}</span>
          {icon}
        </Link>
      ) : (
        <button className={buttonStyles}>
          <span>{label}</span>
          {icon}
        </button>
      )}
    </>
  );
};

export { Button };
