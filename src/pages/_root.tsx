import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import ToastProvider from "../components/toast";
import "../i18n";

import theme from "../styles/vars";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Root;
