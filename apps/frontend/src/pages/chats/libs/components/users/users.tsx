import { ContactList, SearchForm, Tabs } from './libs/components/components.js';

const Users: React.FC = () => {
  return (
    <div className="w-[275px] bg-white rounded-e-md flex flex-col">
      <Tabs />

      <ContactList />

      <SearchForm />
    </div>
  );
};

export { Users };
