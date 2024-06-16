import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/assets/css/index.css';

import {
  App,
  RouterProvider,
  QueryClientProvider,
} from '~/libs/components/components';
import { AppRoute } from '~/libs/enums/enums.js';

import { NotFound } from './pages/not-found/not-found.js';
import { Auth } from './pages/auth/auth.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider>
      <RouterProvider
        routes={[
          {
            element: <App />,
            path: AppRoute.ROOT,
            children: [
              {
                element: <Auth />,
                path: AppRoute.SIGN_IN,
              },
              {
                element: <Auth />,
                path: AppRoute.SIGN_UP,
              },
            ],
          },
          {
            element: <NotFound />,
            path: AppRoute.ANY,
          },
        ]}
      />
    </QueryClientProvider>
  </StrictMode>
);
