import { redirect } from 'react-router';

import { STATUS } from '~/.server/core/auth/constants/STATUS';
import type { IAuthStateChecker } from '~/.server/core/auth/IAuthStateChecker';
import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DIContainer } from './.server/di_container/DIContainer';
import type { Route } from './+types/auth';
import { Page } from './components/Page';

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw redirect('/business/login');
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const authStateChecker = container.get<IAuthStateChecker>(GLOBAL_DI_TYPES.AuthStateChecker);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const { status } = await authStateChecker.execute({ cookie });

    if (status === STATUS.UNAUTHENTICATED) {
      throw redirect('/business/login');
    }
  } catch (error) {
    logger.error(error as Error);
    throw redirect('/business/login');
  }
}

export default function Layout() {
  return <Page />;
}
