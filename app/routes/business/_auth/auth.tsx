import { redirect } from "react-router";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/DIContainer";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { Route } from "./+types/auth";
import { STATUS } from "~/.server/core/auth/constants/STATUS";
import type { IAuthStateChecker } from "~/.server/core/auth/IAuthStateChecker";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw redirect('/business/login');
  }

  const container = diContainer.getContainer();
  const authStateChecker = container.get<IAuthStateChecker>(GLOBAL_DI_TYPES.AuthStateChecker);

  try {
    const { status } = await authStateChecker.execute({ cookie });

    if (status === STATUS.UNAUTHENTICATED) {
      throw redirect('/business/login');
    }
  } catch (error) {
    throw redirect('/business/login');
  }
}

export default function Layout() {
  return <Page />;
}