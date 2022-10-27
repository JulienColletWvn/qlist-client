import { api } from "./api";

type LoginParams = {
  email: string;
  password: string;
};

const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.query<void, void>({
      query: () => "/auth/logout",
    }),
    login: builder.query<void, LoginParams>({
      query: (body: LoginParams) => ({
        url: "/auth/login",
        method: "POST",
        body,
        responseHandler: "text",
      }),
    }),
  }),
});

export const { useLazyLogoutQuery, useLazyLoginQuery } = extendedApiSlice;
