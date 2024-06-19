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
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  activeClassName?: string | undefined;
  disabled?: boolean;
  type?: 'button' | 'submit';
  size?: 'md' | 'sm';
};

const Button: React.FC<Properties> = ({
  className,
  href,
  label,
  iconName,
  iconClassName,
  activeClassName,
  onClick,
  disabled,
  buttonStyle = 'primary',
  type = 'button',
  size = 'md',
}) => {
  const buttonStyles = getValidClassNames(
    'flex flex-row items-center justify-center gap-2 text-md md:text-lg',
    buttonStyle !== 'link' &&
      'px-4 py-1.5 md:px-6 md:py-2 rounded-md hover:opacity-80 active:opacity-60',
    buttonStyle === 'primary' && 'bg-blue-500 text-white',
    buttonStyle === 'secondary' && 'bg-white',
    buttonStyle === 'link' && 'hover:underline',
    size === 'sm' && 'text-sm px-5 py-1.5',
    disabled && 'bg-gray-400',
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
          <span className='className="w-full text-center"'>{label}</span>
          {icon}
        </Link>
      ) : (
        <button
          className={buttonStyles}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          <span className="w-full text-center">{label}</span>
          {icon}
        </button>
      )}
    </>
  );
};

export { Button };
