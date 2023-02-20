import { useQuery } from "react-query";
import { request } from "./utils";

type User = {
  email: string;
  firstname: string;
  lastname: string;
};

const getUser = async () => request<User>({ url: "/user" });

export const useGetUser = () =>
  useQuery(["user"], getUser, { staleTime: 10 * (60 * 1000) });
