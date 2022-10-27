import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "../store";
import { Outlet } from "react-router-dom";

import theme from "../styles/theme";
import "../styles/index.css";

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
