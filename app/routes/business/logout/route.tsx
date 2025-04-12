import { redirect } from "react-router";
import { diContainer } from "./.server/di_container/DIContainer";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { Route } from "./+types/route";
import type { ISessionStorageManager } from "~/.server/core/session/ISessionStorageManager";

export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login/');
  }

  const container = diContainer.getContainer();
  const SessionStorageManager = container.get<ISessionStorageManager>(GLOBAL_DI_TYPES.SessionStorageManager)

  const session = await SessionStorageManager.getSession(cookie);

  if (!session?.data || !session.data.id) {
    return redirect('/business/login/');
  }

  const setCookieHeader = await SessionStorageManager.destroySession(session);

  return redirect('/business/login/', {
    headers: {
      'Set-Cookie': setCookieHeader,
    },
  });
}