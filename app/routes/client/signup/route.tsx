import { redirect } from "react-router";
import { FirebaseError } from "firebase/app";
import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { CustomBaseError } from "~/.server/core/errors/custom_base_error";
import { STATUS } from "~/config/const/status";
import { auth } from "~/lib/firebase";
import { Page } from "./components/Page";
import { schema } from "./config/schema";
import { diContainer } from "./.server/di_container/di_container";
import { TYPES } from "./.server/di_container/types";
import type { IActionService } from "./.server/interfaces/i_action_service";

export async function loader() {
  if (auth.currentUser) {
    return redirect('/client/');
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

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(TYPES.ActionService);

  try {
    const result = await actionService.handleAction({ name, email, password });
    return redirect(result.redirectTo);

  } catch(error) {
    if (error instanceof CustomBaseError || error instanceof FirebaseError) {
      return {
        status: STATUS.FAILED,
        lastResult: submission.reply(),
      };
    }

    throw new Response('Internal server error', { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}