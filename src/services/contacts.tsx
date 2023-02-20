import { useQuery, useMutation } from "react-query";

import { request } from "./utils";

export type Contact = {
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  lang?: string;
};

const getContacts = async () =>
  request<Contact[]>({
    url: "/user/contacts",
  });

const createContacts = async (body: Contact[]) =>
  request({
    url: "/user/contacts",
    options: { method: "POST", body: JSON.stringify(body) },
  });

export const useGetContacts = () =>
  useQuery(["contacts"], getContacts, { staleTime: 10 * (60 * 1000) });
export const useCreateContacts = () =>
  useMutation(["contacts"], createContacts);
