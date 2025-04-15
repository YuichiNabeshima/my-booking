import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'react-router';

import type { IAuthStateChecker } from '~/.server/core/auth/IAuthStateChecker';
import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';
import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
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

    if (status === STATUS.AUTHENTICATED) {
      return redirect('/business/dashboard/');
    }
  } catch (error) {
    logger.error(error as Error);
    return {
      status: STATUS.FAILED,
    };
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

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const { cookie } = await actionService.execute({ email, password });

    return redirect('/business/dashboard', {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return {
        status: STATUS.FAILED,
        lastResult: submission.reply(),
      };
    }

    throw new Response('Internal Server Error', { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}
