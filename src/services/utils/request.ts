import config from "../../config.json";

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

export const request = async <T>({
  url,
  options,
  params,
  pathParams = {},
}: {
  url: string;
  options?: RequestInit;
  params?: Record<string, string>;
  pathParams?: Record<string, string>;
}): Promise<T | null> => {
  const res = await fetch(
    `${config.api.baseUrl}${makeUrlWithPathParameters(url)(pathParams)}${
      params ? `?${new URLSearchParams(params).toString()}` : ""
    }`,
    { ...options, credentials: "include" }
  );
  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  if (contentType && /application\json/.test(contentType)) {
    return res.json();
  }

  if (res.status === 204) return null;

  return null;
};
