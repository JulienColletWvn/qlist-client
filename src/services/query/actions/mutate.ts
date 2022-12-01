import { ServiceName, select } from "../reducer";
import { getCacheKey } from "../utils";
import { QUERY_ACTION_TYPE_PREFIX } from "../vars";
import { Services } from "../../../services/services";
import { getServices } from "../../../services";

export const getMutationAction = <
  T extends ServiceName,
  X extends ServiceName,
  U extends Parameters<Services[T]>,
  Y extends Parameters<Services[X]>
>({
  service,
  args,
  callback,
  mutatedDataParams,
}: {
  service: T;
  args: U;
  callback: (params: {
    state: Awaited<ReturnType<Services[X]>>["response"];
    response: Awaited<ReturnType<Services[T]>>;
  }) => Partial<Awaited<ReturnType<Services[X]>>["response"]>;
  mutatedDataParams: {
    service: X;
    args: Y;
    cacheKey?: string;
  };
}) => ({
  type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/mutation`,
  payload: async ({ state, dispatch }) => {
    const cacheKey = getCacheKey({ service, args });
    const mutatedCacheKey =
      mutatedDataParams.cacheKey ?? getCacheKey(mutatedDataParams);
    const services = getServices({
      ...state.application.servicesOptions,
      locale: state.application.selectedLanguage || "en",
    });

    dispatch({
      type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/loading`,
      payload: {
        cacheKey,
      },
    });

    const response = (await (services[service] as any)(...args)) as Awaited<
      ReturnType<Services[T]>
    >; // TODO : Solve "A spread argument must either have a tuple type or be passed to a rest parameter.ts(2556)" issue

    const nextMutatedState = callback({
      response,
      state: select(state)(mutatedDataParams),
    });

    if (nextMutatedState)
      return dispatch({
        type: `${QUERY_ACTION_TYPE_PREFIX}/${mutatedDataParams.service}/contentUpdate`,
        payload: {
          content: nextMutatedState,
          cacheKey: mutatedCacheKey,
        },
      });

    if (response?.response)
      return dispatch({
        type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/content`,
        payload: {
          content: response.response,
          cacheKey,
        },
      });

    return dispatch({
      type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/error`,
      payload: {
        content: response.error?.text,
        cacheKey,
      },
    });
  },
});
