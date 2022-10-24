import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "../store";
import { PropsWithChildren, useEffect } from "react";
import { redirect, Outlet } from "react-router-dom";

import { useGetUserQuery } from "../services";
import { getRoute } from "../router/routes";

import theme from "../styles/theme";

const Authentication = ({ children }: PropsWithChildren<{}>) => {
  const { isError, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (isError) redirect(getRoute("login"));
  }, [isError]);

  if (isLoading) return <h1>Loading...</h1>;

  return <>{children}</>;
};

const Root = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Authentication>
          <Outlet />
        </Authentication>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
