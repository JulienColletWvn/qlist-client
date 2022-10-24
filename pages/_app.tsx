import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "@store/index";
import Authentication from "./_authentication";

import theme from "../styles/theme";

function Qlist({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Authentication>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Authentication>
    </Provider>
  );
}

export default Qlist;
