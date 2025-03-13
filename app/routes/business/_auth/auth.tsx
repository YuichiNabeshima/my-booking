import { redirect } from "react-router";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/DIContainer";
import type { IAuthRedirectService } from "~/.server/services/auth/auth_redirect_service/IAuthRedirectService";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { Route } from "./+types/auth";
import { STATUS } from "~/.server/services/auth/auth_redirect_service/constants/STATUS";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const container = diContainer.getContainer();
  const authRedirectService = container.get<IAuthRedirectService>(GLOBAL_DI_TYPES.AuthRedirectService);

  try {
    const { status } = await authRedirectService.execute({ cookie });

    if (status === STATUS.UNAUTHENTICATED) {
      return redirect('/business/login');
    }
  } catch (error) {
    return redirect('/business/login');
  }
}

export default function Layout() {
  return <Page />;
}