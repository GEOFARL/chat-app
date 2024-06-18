import { useState } from '~/libs/hooks/hooks.js';
import { ContactList, SearchForm, Tabs } from './libs/components/components.js';
import { type Tab } from './libs/types/types.js';

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Online');

  return (
    <div className="w-[275px] bg-white rounded-e-md flex flex-col">
      <Tabs
        activeTab={activeTab}
        onChange={(newTab: Tab) => setActiveTab(newTab)}
      />

      <ContactList />

      <SearchForm />
    </div>
  );
};

export { Users };
