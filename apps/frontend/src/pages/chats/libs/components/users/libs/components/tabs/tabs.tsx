import { Fragment } from 'react/jsx-runtime';

import { Tab } from '../tab/tab.tsx';
import { TAB_LIST } from '../../constants/constants.js';
import { type Tab as TTab } from '../../types/types.js';

type Properties = {
  activeTab: TTab;
  onChange: (newTab: TTab) => void;
};

const Tabs: React.FC<Properties> = ({ activeTab, onChange }) => {
  return (
    <div className="w-full flex">
      {TAB_LIST.map((tab, index) => {
        if (index === TAB_LIST.length - 1) {
          return (
            <Tab
              label={tab}
              key={index}
              isActive={activeTab === tab}
              onChange={onChange}
            />
          );
        }

        return (
          <Fragment key={index}>
            <Tab label={tab} isActive={activeTab === tab} onChange={onChange} />
            <div className="w-[1px] bg-gray-300" />
          </Fragment>
        );
      })}
    </div>
  );
};

export { Tabs };
