import { lazy, Suspense } from 'react';
import { type LucideProps } from 'lucide-react';

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { type IconName } from '~/libs/types/types.js';

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export { Icon };
