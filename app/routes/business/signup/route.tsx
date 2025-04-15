import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'react-router';

import { STATUS as AUTH_STATUS } from '~/.server/core/auth/constants/STATUS';
import type { IAuthStateChecker } from '~/.server/core/auth/IAuthStateChecker';
import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DIContainer } from './.server/di_container/DIContainer';
import { DI_TYPES } from './.server/di_container/ID_TYPES';
import type { IActionService } from './.server/interfaces/IActionService';
import type { Route } from './+types/route';
import { Page } from './components/Page';
import { STATUS } from './constants/STATUS';
import { schema } from './schemas/schema';

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const authStateChecker = container.get<IAuthStateChecker>(GLOBAL_DI_TYPES.AuthStateChecker);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const { status } = await authStateChecker.execute({ cookie });

    if (status === AUTH_STATUS.AUTHENTICATED) {
      return redirect('/business/dashboard');
    }
  } catch (error) {
    logger.error(error as Error);
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const result = await actionService.handleAction({ name, email, password });

    return redirect('/business/dashboard', {
      headers: {
        'Set-Cookie': result.cookie,
      },
    });
  } catch (error) {
    logger.error(error as Error);
    return {
      status: STATUS.FAILED,
    };
  }
}

export default function Route() {
  return <Page />;
}
