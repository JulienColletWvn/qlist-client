import { mergeDeep } from "./utils/object";
import { QUERY_ACTION_TYPE_PREFIX, UNKNOWN_ERROR_PAYLOAD } from "./vars";
import { Services } from "../";
import { getCacheKey } from "./utils";

export type ActionTypes =
  | "error"
  | "loading"
  | "content"
  | "contentUpdate"
  | "fetch";

export type ServiceName = keyof Services;

export type ApiState<T extends keyof Services> = {
  error: string | null;
  loading: boolean;
  content: ReturnType<Services[T]> | null;
};

export const select =
  (state) =>
  ({
    service,
    args,
    cacheKey,
  }: {
    service: ServiceName;
    args: any;
    cacheKey?: string;
  }) =>
    state[service] &&
    state[service][cacheKey ?? getCacheKey({ service, args })];

export const reducer = (
  state = {},
  { type, payload }: { type: string; payload: any }
) => {
  if (
    !new RegExp(
      `^${QUERY_ACTION_TYPE_PREFIX}\\/(\\w*)\\/(loading|content|contentUpdate|error)`
    ).test(type)
  )
    return state;

  const { content, cacheKey } = payload;
  const [, service, action]: [null, keyof Services, ActionTypes] =
    type.split("/");

  const getNextState = (): ApiState<typeof service> => {
    switch (action) {
      case "error":
        return {
          content: null,
          error: content || UNKNOWN_ERROR_PAYLOAD,
          loading: false,
        };
      case "loading":
        return {
          content: null,
          error: null,
          loading: true,
        };
      case "contentUpdate":
        return {
          content: mergeDeep(
            {},
            state[service]?.[cacheKey]?.content ?? {},
            content
          ),
          error: null,
          loading: false,
        };
      default:
        return {
          content: content,
          error: null,
          loading: false,
        };
    }
  };

  return {
    ...state,
    [service]: {
      ...state[service],
      [cacheKey]: getNextState(),
    },
  };
};
