import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";

import { useGetUserQuery } from "@services/index";
import { getRoute } from "@utils/routes";

const Authentication = ({ children }: PropsWithChildren<{}>) => {
  const { isError, isLoading } = useGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (isError) router.push(getRoute("login"));
  }, [isError]);

  if (isLoading) return <h1>Loading...</h1>;

  return <>{children}</>;
};

export default Authentication;
