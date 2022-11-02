import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "../store";
import { Outlet } from "react-router-dom";
import ToastProvider from "../components/toast";
import "../i18n";

import theme from "../styles/vars";
import "../styles/index.less";

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
