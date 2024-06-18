import { useCallback, useForm } from '~/libs/hooks/hooks.js';
import { Input } from '~/libs/components/components.js';
import { useStore } from '~/pages/chats/libs/hooks/hooks.js';

const SearchForm: React.FC = () => {
  const { userSearch, setUserSearch } = useStore((state) => ({
    userSearch: state.userSearch,
    setUserSearch: state.setUserSearch,
  }));

  const { control, getValues } = useForm<{ search: string }>({
    defaultValues: {
      search: userSearch,
    },
  });

  const handleChange = useCallback(() => {
    const searchValue = getValues().search;
    setUserSearch(searchValue);
  }, [getValues, setUserSearch]);

  return (
    <form onChange={handleChange} className="p-4">
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
