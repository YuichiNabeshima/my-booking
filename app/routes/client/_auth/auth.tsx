import { redirect } from "react-router";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { CustomBaseError } from "~/.server/core/errors/custom_base_error";
import { auth } from "~/lib/firebase";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/di_contaner";
import { TYPES } from "./.server/di_container/types";
import type { ILoaderService } from "./.server/interfaces/i_loader_service";

export async function loader() {
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(TYPES.LoaderService);

  try {
    const loaderData = await loaderService.getLoaderData();

    if (loaderData.status === 'redirect') {
      return redirect(loaderData.redirectTo);
    }
  } catch (error) {
    if (error instanceof CustomBaseError || error instanceof FirebaseError) {
      signOut(auth)
      return redirect('/client/login/');
    }
  }
}

export default function Layout() {
  return <Page />;
}