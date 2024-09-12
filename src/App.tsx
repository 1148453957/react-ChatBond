import { useState } from "react";
import HomeHeader from "@/components/HomeHeader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/home",
    element: <div>Hello222222 world!</div>,
  },
]);
import { ConfigProvider, StyleProvider } from "antd";
import { initTA } from "@/assets/js/TA";
import { getUrlParam } from "@/assets/js/utils";
import Cookies from "js-cookie";

function App() {
  initTA();
  /* const gd = useGlobalData()
  if (Cookies.get('isLogined') == '1') {
    gd.getUserInfo()
  } */

  const channelId = getUrlParam("c"); //推广渠道id
  const fromId = getUrlParam("cc"); //推广人
  Cookies.set("language", navigator.language, {
    domain:
      import.meta.env.VITE_RUN_ENV == "prod" ? ".chatbond.co" : ".aecoapps.com",
  });
  Cookies.set("channelId", channelId, {
    domain:
      import.meta.env.VITE_RUN_ENV == "prod" ? ".chatbond.co" : ".aecoapps.com",
  });
  Cookies.set("fromId", fromId, {
    domain:
      import.meta.env.VITE_RUN_ENV == "prod" ? ".chatbond.co" : ".aecoapps.com",
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0AC655",
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <HomeHeader />
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
