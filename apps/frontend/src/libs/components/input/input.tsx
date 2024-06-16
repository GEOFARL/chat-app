import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  className?: string | undefined;
  label: string;
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
};

const Input: React.FC<Properties> = ({
  className,
  label,
  placeholder,
  type = 'text',
}) => {
  const inputClasses = getValidClassNames(
    'border-2 rounded-md px-4 py-2 text-md',
    className
  );

  return (
    <label className="flex flex-col gap-1 justify-start w-full">
      <span className="text-lg pl-1">{label}</span>
      <input type={type} placeholder={placeholder} className={inputClasses} />
    </label>
  );
};

export { Input };
