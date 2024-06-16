import { QueryClient as LibraryQueryClient } from '@tanstack/react-query';

class QueryClient {
  public instance: LibraryQueryClient;

  public constructor() {
    this.instance = new LibraryQueryClient();
  }
}

export { QueryClient };
