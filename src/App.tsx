import { lazy } from "react";
import HomeHeader from "@/components/HomeHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { initTA } from "@/assets/js/TA";
import { getUrlParam } from "@/assets/js/utils";
import Cookies from "js-cookie";
import LazyImportComponent from "@/components/lazyImportComponent";

function App() {
  initTA();
  console.log("初始化");

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
        <BrowserRouter>
          <HomeHeader />
          <Routes>
            <Route
              path="/"
              element={
                <LazyImportComponent
                  lazyChildren={lazy(() => import("@/pages/Home/index"))}
                />
              }
            />
            <Route
              path="/center"
              element={
                <LazyImportComponent
                  lazyChildren={lazy(() => import("@/pages/Center"))}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
