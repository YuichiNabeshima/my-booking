import jwt from "jsonwebtoken";
import type { Route } from "./+types/route";
import { CustomBaseError } from "~/.server/core/errors/custom_base_error";
import type { Time } from "~/types/Time";
import type { CreateTokenPayload } from "../index/utils/createToken.server";
import { Page } from "./components/Page";
import { STATUS } from "./constants/STATUS";
import { diContainer } from "./.server/di_container/DIContainer";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import type { IActionService } from "./.server/interfaces/IActionService";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";

export async function loader({ request, params }: Route.LoaderArgs) {
  const businessId = Number(params.businessId);
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return {
      status: STATUS.FAILED,
    };
  }

  const container = diContainer.getContainer();
  diContainer.bindMock();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const resutl = await loaderService.execute({ businessId, token });

    return {
      status: STATUS.SUCCESS,
      data: resutl
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: STATUS.TOKEN_EXPIRED,
      };
    }

    if (error instanceof CustomBaseError || error instanceof jwt.JsonWebTokenError) {
      return {
        status: STATUS.FAILED,
      };
    }
    throw new Response('Internal Server Error', { status: 500 });
  }
}


export async function action({ request, params }: Route.ActionArgs) {
  const businessId = Number(params.businessId);
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return {
      status: STATUS.FAILED,
    };
  }

  const container = diContainer.getContainer();
  diContainer.bindMock();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const { guests, kind, course, date, time, name, email } = jwt.verify(token, process.env.TOKEN_KEY as string) as CreateTokenPayload;
    
    const result = await actionService.handleAction({
      fullName: name,
      email,
      businessId,
      date,
      time: time as Time,
      courseId: course,
      customerKind: kind,
      numberOfguests: Number(guests),
    });

    return result;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: STATUS.TOKEN_EXPIRED,
      };
    }

    if (error instanceof CustomBaseError || error instanceof jwt.JsonWebTokenError) {
      return {
        status: STATUS.FAILED,
      };
    }
    throw new Response('Internal Server Error', { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}