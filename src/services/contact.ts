import { api } from "./api";

export type Contact = {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  lang: string;
}[];

const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "/user/contacts",
      providesTags: ["Contacts"],
    }),
    createContacts: builder.mutation({
      query: (body: Contact) => {
        return {
          url: "/user/contacts",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const { useGetContactsQuery, useCreateContactsMutation } =
  extendedApiSlice;
