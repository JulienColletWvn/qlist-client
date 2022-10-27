import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../services/user";

const Authenticated = ({ children }: PropsWithChildren<{}>) => {
  const { isError, isLoading } = useGetUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) navigate("/register");
  }, [isError]);

  if (isLoading) return <h1>Loading...</h1>;

  return <>{children}</>;
};

export default Authenticated;
