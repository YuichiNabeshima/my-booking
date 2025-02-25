interface UnAuthenticated {
  status: 'redirect';
  redirectTo: '/client/login/';
}

interface Authenticated {
  status: 'authenticated';
  client: {
    id: number;
    email: string;
    name: string;
  };
}

export type GetLoaderDataDTO = Authenticated | UnAuthenticated;
