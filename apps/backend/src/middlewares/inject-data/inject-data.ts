import { authService } from '~/modules/auth/auth.js';

import { BaseInjectData } from './base-inject-data.middleware.js';

const injectData = new BaseInjectData({
  authService,
});

export { injectData };
