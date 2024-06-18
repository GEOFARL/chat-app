import { useCallback, useForm } from '~/libs/hooks/hooks.js';
import { Input } from '~/libs/components/components.js';

const SearchForm: React.FC = () => {
  const { handleSubmit, control } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = useCallback((data: unknown) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Input
        label="Search contacts"
        isVisuallyHiddenLabel
        control={control}
        name="search"
        placeholder="Search..."
        className="text-sm"
      />
    </form>
  );
};

export { SearchForm };
