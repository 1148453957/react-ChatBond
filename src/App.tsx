import HomeHeader from "@/components/HomeHeader";
import { initMessageApi, contextHolder } from "@/components/Message";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
  useNavigate,
} from "react-router-dom";

import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { initTA } from "@/assets/js/TA";
import { getUrlParam } from "@/assets/js/utils";
import Cookies from "js-cookie";
import { Button } from "antd";
import { sendTA } from "@/assets/js/TA";

export default function Root() {
  initTA();
  initMessageApi();
  console.log("初始化");

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

  const App = () => {
    // 每次路由变化时，这个函数都会执行，子组件的函数也会执行
    // TODO:但是好像不是所有子组件都会重新渲染，如果子组件的 props 或 state 没有发生变化，并且子组件没有被强制更新（如没有调用 forceUpdate），则这些子组件不会重新渲染
    // App 函数的执行并不等同于子组件的重新渲染

    sendTA("page_entry");

    return (
      <>
        {contextHolder}
        <HomeHeader />
        <Outlet />
      </>
    );
  };
  /**404页面 */
  const NotFoundElement = () => {
    const navigate = useNavigate();
    return (
      <div className="w-full h-full fcc flex-col mt--16">
        <div className="w-full fcc">
          <span className="text-6">404</span>
          <div className="w-0.25 h-8 bg-[#ccc] mx-5"></div>
          <span>This page could not be found.</span>
        </div>
        <Button
          type="primary"
          className="!w-50 !h-14 mt-8 linearBg !fw-700 !text-4"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </div>
    );
  };
  /**登录拦截 */
  const loginLoader = () => {
    if (Cookies.get("isLogined") != "1") {
      // 如果已经登录了，跳转到center页面
      throw redirect(
        "/login?r=" +
          encodeURIComponent(
            location.pathname + location.search + location.hash
          )
      );
    }
    return null;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      async loader() {
        // react-router-dom 的根路由 loader 不会在子路由中生效
        // loader的返回值，只有当前的Component可以通过useLoaderData拿到，Component的子路由是拿不到的，自己只能拿自己的
        // loader如果是异步的，await new Promise((r) => setTimeout(r, 5000))
        // 1. 刷新页面，因为loader部分阻塞，导致整个页面都渲染不了，页面渲染fallbackElement，等到结果返回以后，渲染整个页面
        // 2. 如果是页面之间跳转，从B页面跳转A页面，因为loader部分阻塞，会导致停留在当前页面B页面，路由不变，等loader结果返回以后，渲染A页面完成跳转，路由刷新
        return null;
      },
      Component: App,
      children: [
        {
          index: true,
          lazy: () => import("@/pages/Home"),
        },
        {
          path: "login",
          loader() {
            if (Cookies.get("isLogined") == "1") {
              // 如果已经登录了，跳转到center页面
              throw redirect("/center");
            }
            return null;
          },
          lazy: () => import("@/pages/Login/Login"),
        },
        {
          path: "signUp",
          loader() {
            if (Cookies.get("isLogined") == "1") {
              // 如果已经登录了，跳转到center页面
              throw redirect("/center");
            }
            return null;
          },
          lazy: () => import("@/pages/Login/SignUp"),
        },
        {
          path: "resetPassword",
          lazy: () => import("@/pages/Login/ResetPassword"),
        },
        {
          path: "center",
          loader: loginLoader,
          lazy: () => import("@/pages/Center"),
        },
        {
          path: "iframe",
          loader() {
            // 跳转到iframe页面的时候，会把顶部的header去掉，把右下角弹窗关闭,把右下角按钮隐藏
            if (window.allyFyRemoveIcon) {
              window.allyFyRemoveIcon();
            }
            return null;
          },
          lazy: () => import("@/pages/Iframe"),
        },
        {
          path: "*",
          element: <NotFoundElement />,
        },
      ],
    },
  ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0AC655",
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <RouterProvider router={router} fallbackElement={<></>} />
      </StyleProvider>
    </ConfigProvider>
  );
}
