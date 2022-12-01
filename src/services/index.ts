import config from "../config.json";

export type ApiResponseError = null | { code: number; text: string };

export type ApiResponse<T> = {
  response: T | null;
  error: ApiResponseError;
};

export type PromisedApiResponse<T> = Promise<ApiResponse<T>>;

export const makeUrlWithPathParameters =
  (url: string) => (params: Record<string, string>) =>
    params != null
      ? Object.entries(params).reduce((acc, [key, value]) => {
          const regex = new RegExp("\\{" + key + "\\}");
          if (!regex.test(acc))
            console.error(`{${key}} key doesn't exists in ${url} URL template`);
          return acc.replace(regex, value);
        }, url)
      : url;

const request = async function <T>({
  url,
  options,
  params,
  pathParams = {},
}: {
  url: string;
  options?: RequestInit;
  params?: Record<string, string>;
  pathParams?: Record<string, string>;
}): PromisedApiResponse<T> {
  try {
    const response = await fetch(
      `${config.api.baseUrl}${makeUrlWithPathParameters(url)(pathParams)}${
        params ? `?${new URLSearchParams(params).toString()}` : ""
      }`,
      options
    );

    if (response.status !== 200 && response.status !== 204) {
      return Promise.resolve({
        response: null,
        error: {
          code: response?.status ?? 404,
          text: response?.statusText ?? "fetchError",
        },
      });
    }

    const data =
      response.status === 204
        ? (true as any)
        : ((await response.json()) as ResponseType);

    return Promise.resolve({
      response: data,
      error: null,
    });
  } catch (e) {
    return Promise.resolve({
      response: null,
      error: { code: 404, text: "fetchError" },
    });
  }
};

export type Services = {
  login(params: {
    username: string;
    password: string;
  }): PromisedApiResponse<boolean>;
};

const services: Services = {
  login: (options) =>
    request({
      url: "api/auth/login",
      options: {
        method: "POST",
      },
    }),
};
