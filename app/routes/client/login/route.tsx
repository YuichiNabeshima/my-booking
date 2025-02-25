import { redirect } from "react-router";
import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/di_container";
import { TYPES } from "./.server/di_container/types";
import type { IActionService } from "./.server/interfaces/i_action_service";
import { CustomBaseError } from "~/.server/server_utils/logger/custom_base_error";
import { auth } from "~/lib/firebase";

export async function loader() {
  if (auth.currentUser) {
    return redirect('/client/');
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(TYPES.ActionService);

  try {
    await actionService.handleAction({ email, password });
    return redirect('/client/');
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return {
        isFailure: true,
      };
    }
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}