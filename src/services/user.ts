import { api } from "./api";

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

export const extendedApiSlice = api.injectEndpoints({
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

export const { useGetUserQuery, useCreateUserMutation } = extendedApiSlice;
