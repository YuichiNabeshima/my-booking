import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/di_contaner";
import { TYPES } from "./.server/di_container/types";
import type { ILoaderService } from "./.server/interfaces/i_loader_service";
import { redirect } from "react-router";
import { CustomBaseError } from "~/.server/server_utils/logger/custom_base_error";
import { NoClientError } from "./.server/custom_errors/no_client_error";
import { auth } from "~/lib/firebase";

export async function loader() {
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(TYPES.LoaderService);

  try {
    const loaderData = await loaderService.getLoaderData();

    if (loaderData.status === 'redirect') {
      return redirect(loaderData.redirectTo);
    }
  } catch (error) {
    if (error instanceof NoClientError) {
      signOut(auth)
      throw new Response('Unauthorized', { status: 401 });
    }
    if (error instanceof CustomBaseError || error instanceof FirebaseError) {
      return redirect('/client/login/');
    }
  }
}

export default function Layout() {
  return <Page />;
}