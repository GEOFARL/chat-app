import { Fragment } from 'react/jsx-runtime';

import { Tab } from '../tab/tab.tsx';
import { TAB_LIST } from '../../constants/constants.js';
import { useStore } from '~/pages/chats/libs/hooks/hooks.ts';

const Tabs: React.FC = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }));

  return (
    <div className="w-full flex">
      {TAB_LIST.map((tab, index) => {
        if (index === TAB_LIST.length - 1) {
          return (
            <Tab
              label={tab}
              key={index}
              isActive={activeTab === tab}
              onChange={(newTab) => setActiveTab(newTab)}
            />
          );
        }

        return (
          <Fragment key={index}>
            <Tab
              label={tab}
              isActive={activeTab === tab}
              onChange={(newTab) => setActiveTab(newTab)}
            />
            <div className="w-[1px] bg-gray-300" />
          </Fragment>
        );
      })}
    </div>
  );
};

export { Tabs };
