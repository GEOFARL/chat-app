import {
  type FieldPath,
  type Control,
  type FieldValues,
} from 'react-hook-form';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

type Properties<T extends FieldValues> = {
  className?: string | undefined;
  label: string;
  control: Control<T, null>;
  name: FieldPath<T>;
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
};

const Input = <T extends FieldValues>({
  className,
  label,
  placeholder,
  control,
  name,
  type = 'text',
}: Properties<T>) => {
  const { field } = useFormController({ control, name });

  const inputClasses = getValidClassNames(
    'border-2 rounded-md px-4 py-2 text-md',
    className
  );

  return (
    <label className="flex flex-col gap-1 justify-start w-full">
      <span className="text-lg pl-1">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        {...field}
      />
    </label>
  );
};

export { Input };
