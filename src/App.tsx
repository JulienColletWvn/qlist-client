import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./router";

const client = new QueryClient();

export default () => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Inter",
        colorPrimary: "#4AC8D8",
      },
    }}
  >
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ConfigProvider>
);
