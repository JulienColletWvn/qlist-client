import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default () => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Inter",
        colorPrimary: "#00b96b",
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
