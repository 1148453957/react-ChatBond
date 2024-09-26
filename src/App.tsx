import { useEffect } from "react";
import HomeHeader from "@/components/HomeHeader";
import { initMessageApi, contextHolder } from "@/components/Message";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
  useNavigate,
  useLocation,
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

  const App = () => {
    // 每次路由变化时，这个函数都会执行，子组件的函数也会执行
    // TODO:但是好像不是所有子组件都会重新渲染，如果子组件的 props 或 state 没有发生变化，并且子组件没有被强制更新（如没有调用 forceUpdate），则这些子组件不会重新渲染
    // App 函数的执行并不等同于子组件的重新渲染
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      // 每次路由变化时执行
      console.log("Current path:", location.pathname);
      sendTA("page_entry");
      if (location.pathname.startsWith("/iframe")) {
        // 跳转到iframe页面的时候，会把顶部的header去掉，把右下角弹窗关闭,把右下角按钮隐藏
        if (window.allyFyRemoveIcon) {
          window.allyFyRemoveIcon();
        }
      }
      if (
        Cookies.get("isLogined") != "1" &&
        location.pathname != "/" &&
        [
          "/login",
          "/signUp",
          "/resetPassword",
          "/pricing",
          "/nt/oauth/callback",
          "/changelog",
          "/blog",
          "/exchange",
        ].every((e) => !location.pathname.startsWith(e))
      ) {
        // 没登录，且不是白名单页面，要跳转登录,但是其实先走login的loader，然后才走这里的
        navigate(
          "/login?r=" + location.pathname + location.search + location.hash
        );
      }
    }, [location, navigate]);

    return (
      <>
        {contextHolder}
        <HomeHeader />
        <Outlet />
      </>
    );
  };

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
          lazy: () => import("@/pages/Home/index"),
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
          async lazy() {
            return await import("@/pages/Login/Login");
          },
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
          async lazy() {
            return await import("@/pages/Login/SignUp");
          },
        },
        {
          path: "resetPassword",
          lazy: () => import("@/pages/Login/ResetPassword"),
        },
        {
          path: "center",
          async lazy() {
            return await import("@/pages/Center");
          },
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
