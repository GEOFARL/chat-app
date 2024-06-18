import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type Tab as TTab } from '../../types/types.js';

const Tab: React.FC<{
  isActive?: boolean;
  onChange: (newTab: TTab) => void;
  label: TTab;
}> = ({ isActive, label, onChange }) => {
  return (
    <button
      className={getValidClassNames(
        'flex-1 py-2 px-4 bg-grey-200',
        isActive && 'bg-white',
        !isActive && 'border-b border-gray-300'
      )}
      onClick={() => onChange(label)}
    >
      {label}
    </button>
  );
};

export { Tab };
