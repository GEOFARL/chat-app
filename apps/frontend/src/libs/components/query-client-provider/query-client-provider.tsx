import { ReactNode } from 'react';
import { QueryClientProvider as LibraryQueryCLientProvider } from '@tanstack/react-query';

import { queryCLient } from '~/libs/modules/query-client/query-client.js';

type Properties = {
  children: ReactNode;
};

const QueryClientProvider: React.FC<Properties> = ({ children }) => {
  return (
    <LibraryQueryCLientProvider client={queryCLient.instance}>
      {children}
    </LibraryQueryCLientProvider>
  );
};

export { QueryClientProvider };
