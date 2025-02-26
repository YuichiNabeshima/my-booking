import { redirect } from "react-router";
import { diContainer } from "./.server/di_container/DIContainer";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { Route } from "./+types/route";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";

export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login/');
  }

  const container = diContainer.getContainer();
  const sessionStorageService = container.get<ISessionStorageService>(GLOBAL_DI_TYPES.SessionStorageService)

  const session = await sessionStorageService.getSession(cookie);

  if (!session?.data || !session.data.id) {
    return redirect('/business/login/');
  }

  const setCookieHeader = await sessionStorageService.destroySession(session);

  return redirect('/business/login/', {
    headers: {
      'Set-Cookie': setCookieHeader,
    },
  });
}