import { ValueOf } from '~/libs/types/types.js';
import { AppRoute } from '~/libs/enums/enums.js';

import { Button } from '~/libs/components/button/button.tsx';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  label: string;
};

const NavigationItem: React.FC<Properties> = ({ to, label }) => {
  return (
    <li className="text-lg">
      <Button
        href={to}
        label={label}
        buttonStyle="link"
        activeClassName="text-gray-200"
      />
    </li>
  );
};

export { NavigationItem };
