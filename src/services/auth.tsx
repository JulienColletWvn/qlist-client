import { useMutation, useQuery } from "react-query";
import { request } from "./utils";

type LoginParams = { email: string; password: string };

const login = async (body: LoginParams) =>
  request<null>({
    url: "/auth/login",
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  });

const logout = async () => request<null>({ url: "/auth/logout" });

export type RegisterParams = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type RegisterError = {
  status: number;
  data:
    | {
        FailedField: string;
        Tag: string;
      }[]
    | { code: number };
};

const register = async (body: RegisterParams) =>
  request<null>({
    url: "/auth/register",
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  });

export const useRegister = () =>
  useMutation<null, RegisterError, RegisterParams>("register", register);
export const useLogin = () => useMutation("login", login);
export const useLogout = () => useMutation("logout", logout);
