import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default () => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Inter",
        colorPrimary: "#4AC8D8",
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
