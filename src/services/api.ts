import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config.json";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.api.baseUrl}/api/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Events", "Contacts"],
});
