import type { QUERY_PARAMS } from "../constants/QUERY_PARAMS";

export type QueryParams = typeof QUERY_PARAMS[keyof typeof QUERY_PARAMS];