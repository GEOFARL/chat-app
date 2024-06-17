import { type Path, type Control, type FieldValues } from 'react-hook-form';
import { Icon, Input } from '~/libs/components/components.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
};

const PasswordInput = <T extends FieldValues>({ control }: Properties<T>) => {
  const [isVisible, setIsVisible] = useState<boolean>();

  const handleChangeVisibility = useCallback(() => {
    setIsVisible((p) => !p);
  }, []);

  return (
    <div className="relative">
      <Input
        label="Password"
        type={isVisible ? 'text' : 'password'}
        placeholder="•••••••••"
        control={control}
        name={'password' as Path<T>}
        className="pr-12"
      />

      <button
        onClick={handleChangeVisibility}
        className="absolute right-[15px] top-[42px]"
        type="button"
      >
        <Icon name={isVisible ? 'eye' : 'eye-off'} className="w-6 h-6" />
      </button>
    </div>
  );
};

export { PasswordInput };
