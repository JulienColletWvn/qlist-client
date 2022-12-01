import { ServiceName } from "../reducer";
import { getCacheKey } from "../utils";
import { QUERY_ACTION_TYPE_PREFIX } from "../vars";
import { Services } from "../../../services/services";
import { getServices } from "../../../services";

export const getFetchAction = <
  T extends ServiceName,
  U extends Parameters<Services[T]>
>({
  service,
  args,
  cacheKey: userDefinedCacheKey,
}: {
  service: T;
  args: U;
  cacheKey?: string;
}) => ({
  type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/fetch`,
  payload: async ({ state, dispatch }) => {
    const cacheKey = userDefinedCacheKey ?? getCacheKey({ service, args });
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

    const content = (await (services[service] as any)(...args)) as Awaited<
      ReturnType<Services[T]>
    >; // TODO : Solve "A spread argument must either have a tuple type or be passed to a rest parameter.ts(2556)" issue

    if (content?.response)
      return dispatch({
        type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/content`,
        payload: {
          content: content.response,
          cacheKey,
        },
      });

    return dispatch({
      type: `${QUERY_ACTION_TYPE_PREFIX}/${service}/error`,
      payload: {
        content: content.error?.text,
        cacheKey,
      },
    });
  },
});
