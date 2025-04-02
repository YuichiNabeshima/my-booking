import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { QUERY_PARAMS } from "./constants/QUERY_PARAMS";
import { DIContainer } from "./.server/di_container/DIContainer";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = searchParams.get(QUERY_PARAMS.PAGE);
  const cuisine = searchParams.get(QUERY_PARAMS.CUISINE);
  const price = searchParams.get(QUERY_PARAMS.PRICE);
  const neighborhood = searchParams.get(QUERY_PARAMS.NEIGHBORHOOD);

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  const params: {
    page: number;
    cuisine?: string;
    price?: number;
    neighborhood?: string;
  } = {
    page: page ? Number(page) : 1,
  }

  if (cuisine) {
    params.cuisine = cuisine;
  }

  if (price) {
    params.price = Number(price);
  }

  if (neighborhood) {
    params.neighborhood = neighborhood;
  }

  try {
    const data = await loaderService.execute(params);
    return data;
  } catch (error) {
    return null;
  }
}

export default function Route() {
  return <Page />
}