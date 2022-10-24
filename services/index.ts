import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
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
          headers: {
            "Content-Type": "application/json; charset=utf8",
          },
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation } = api;
