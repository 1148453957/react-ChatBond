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
import { ConfigProvider } from "antd";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0AC655",
        },
      }}
    >
      <HomeHeader />
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
