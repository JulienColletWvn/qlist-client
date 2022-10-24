import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config.json";

type User = {
  email: string;
  firstname: string;
  lastname: string;
};

export type CreateUserParams = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.api.baseUrl}/api/`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User | string, void>({
      query: () => "/user",
    }),
    createUser: builder.mutation({
      query: (body: CreateUserParams) => {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation } = api;
