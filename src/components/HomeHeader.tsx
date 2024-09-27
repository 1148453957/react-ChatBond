import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { sendTA } from "@/assets/js/TA";
import styled,{createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  .menuBox {
      .ant-drawer-content-wrapper {
        width: 184px !important;

        .ant-drawer-header {
          display: none;
        }

        .ant-drawer-body {
          padding: 0 !important;
        }
      }

      .menu > * {
        flex-shrink: 0;
      }
    }
`;
const Content = styled.header`

  && {
    &.header {
      box-shadow: 0 8px 32px 0 rgba(75, 209, 104, 0.1);
    }
  

    .ant-btn {
      display: inline-block;
    }
  }
`;
export default function HomeHeader() {
  const pathname = useLocation().pathname;
  const isLogin = ["/login", "/signUp", "/resetPassword"].some((e) =>
    location.pathname.startsWith(e)
  );
  const sendTAFn = (style: string) => {
    sendTA("XWEB_CLICK", {
      name: "home_page",
      style,
      container: Cookies.get("userId"),
    });
  };
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <GlobalStyles />
      {!pathname.startsWith("/iframe") && (
        <Content className="pos-sticky top-0 z-10 header backdrop-blur drop-shadow-sm h-16 px-8 lg:px-14vw flex flex-justify-between items-center text-sm select-none z-999">
          <Link to="/" className="fcc gap-3">
            <img alt="logo" src="/assets/img/logo.png" className="h-12" />
            <img
              alt="logo"
              src="/assets/img/logo_text.png"
              className="h-4 ml-0"
            />
          </Link>
          {!isLogin && (
            <div className="flex gap-12">
              <div className="text-center text-white/50  hidden md:flex items-center m-auto gap-4">
                <Link to="/exchange" className="text-#000">
                  Exchange
                </Link>
                <Link to="/pricing" className="text-#000">
                  Pricing
                </Link>
                <Dropdown
                  dropdownRender={() => (
                    <div className="flex flex-col bg-white w-300px b-1 p-2 rd-2 shadow-lg">
                      <Link to="/changelog" className="!text-#000 fcc">
                        <div className="w-full flex items-start gap-2 p-2 hover-bg-#f4f4f5">
                          <div className="rounded-md border border-zinc-300 bg-white p-2 transition-colors duration-300 ease-in-out group-hover/item:border-zinc-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="current"
                              className="h-6 w-6 text-zinc-600 transition-transform duration-500 ease-in-out group-hover/item:rotate-3 group-hover/item:scale-125 group-hover/item:text-zinc-900"
                            >
                              <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M12.5 8v3.8l1.85 1.85a.5.5 0 0 1-.7.7l-2-2a.5.5 0 0 1-.15-.35V8a.5.5 0 0 1 1 0Zm-.47-5.5A9.43 9.43 0 0 0 4.5 6.26V3a.5.5 0 0 0-1 0v4c0 .28.22.5.5.5h4a.5.5 0 0 0 0-1H5.57c1.6-1.9 3.95-3 6.46-3a8.5 8.5 0 0 1 0 17 8.38 8.38 0 0 1-7.58-4.72.5.5 0 1 0-.9.44 9.38 9.38 0 0 0 8.48 5.28 9.5 9.5 0 0 0 0-19Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <div className="w-full flex flex-col">
                            <span className="text-4 font-semibold leading-6 text-gray-700">
                              Changelog
                            </span>
                            <span className="text-3.5 leading-5 text-zinc-500">
                              Stay up to date with the latest updates and
                              features.
                            </span>
                          </div>
                        </div>
                      </Link>
                      <Link to="/blog" className="!text-#000 fcc">
                        <div className="w-full flex items-start gap-2 p-2 hover-bg-#f4f4f5">
                          <div className="rounded-md border border-zinc-300 bg-white p-2 transition-colors duration-300 ease-in-out group-hover/item:border-zinc-500">
                            <span className="sr-only">Blog</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="8 8 23 23"
                              fill="none"
                              className="h-6 w-6 text-zinc-600 transition-transform duration-500 ease-in-out group-hover/item:rotate-3 group-hover/item:scale-125 group-hover/item:text-zinc-900"
                            >
                              <g>
                                <g>
                                  <line
                                    className="stroke-current stroke-[0.6]"
                                    x1="8.81"
                                    y1="26.07"
                                    x2="31.19"
                                    y2="26.07"
                                  ></line>
                                  <line
                                    className="stroke-current stroke-[0.6]"
                                    x1="8.81"
                                    y1="26.66"
                                    x2="31.19"
                                    y2="26.66"
                                  ></line>
                                  <g>
                                    <path
                                      className="stroke-current stroke-[0.6]"
                                      d="M12.77,25.38l-1.26-0.76c-0.28-0.17-0.37-0.54-0.2-0.82l5.35-8.86c0.11-0.19,0.36-0.25,0.55-0.14l1.6,0.96 c0.19,0.11,0.25,0.36,0.14,0.55l-5.35,8.86C13.42,25.46,13.05,25.55,12.77,25.38z"
                                    ></path>
                                    <path
                                      className="stroke-current stroke-[0.6]"
                                      d="M21.84,25.47h-1.87c-0.21,0-0.39-0.17-0.39-0.39v-9.73c0-0.21,0.17-0.39,0.39-0.39h1.89 c0.21,0,0.39,0.17,0.39,0.39v9.71C22.25,25.29,22.07,25.47,21.84,25.47z"
                                    ></path>
                                    <path
                                      className="stroke-current stroke-[0.6]"
                                      d="M24.99,25.47h-1.7c-0.25,0-0.45-0.2-0.45-0.45v-8.19c0-0.2,0.16-0.36,0.36-0.36h1.95 c0.2,0,0.36,0.16,0.36,0.36v8.12C25.51,25.24,25.28,25.47,24.99,25.47z"
                                    ></path>
                                    <path
                                      className="stroke-current stroke-[0.6]"
                                      d="M28.36,25.47h-1.77c-0.27,0-0.49-0.22-0.49-0.49V13.76c0-0.23,0.19-0.41,0.41-0.41h1.84 c0.23,0,0.41,0.19,0.41,0.41v11.31C28.76,25.29,28.58,25.47,28.36,25.47z"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="w-full flex flex-col">
                            <span className="text-4 font-semibold leading-6 text-gray-700">
                              Blog
                            </span>
                            <span className="text-3.5 leading-5 text-zinc-500">
                              Learn more about chatbond by reading our latest
                              articles.
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                >
                  <span className="text-#000 cursor-pointer">Resource</span>
                </Dropdown>
              </div>
            </div>
          )}

          <div className="hidden md:flex items-center ">
            {Cookies.get("isLogined") == "1" && (
              <>
                <Link to="/help">
                  <span className="mr-4">Help</span>
                </Link>
                <Link to="/center">
                  <span className="mr-4">Chatbots</span>
                </Link>
                <Link to="/account/info">
                  <Button className="!fw-500 !rounded-2 !w-124px !h-10 !border-#040608">
                    Account →
                  </Button>
                </Link>
              </>
            )}
            {Cookies.get("isLogined") != "1" && !isLogin && (
              <>
                <Link to="/login">
                  <span className="mr-4">Log in</span>
                </Link>
                <Link to="/signUp">
                  <Button
                    className="!fw-500 !w-124px !h-10 !border-#040608 "
                    onClick={() => sendTAFn("sign up free")}
                  >
                    Sign Up Free →
                  </Button>
                </Link>
              </>
            )}
          </div>
          {/* 移动端适配时的菜单列表 */}
          <MenuOutlined
            className="block !md:hidden text-5 !text-black w-5 h-5"
            onClick={() => setMenuVisible(true)}
          />
          <Drawer
            open={menuVisible}
            onClose={() => setMenuVisible(false)}
            rootClassName="menuBox"
            placement="right"
          >
            <div className="w-full h-full flex flex-col menu pt-8 pl-8">
              <div
                className="flex flex-col mb-4 gap-4 text-base text-white/50"
                onClick={() => setMenuVisible(false)}
              >
                <Link to="/exchange" className="!text-[#000]">
                  Exchange
                </Link>
                <Link to="/pricing" className="!text-[#000]">
                  Pricing
                </Link>
                <Link to="/changelog" className="!text-[#000]">
                  Changelog
                </Link>
                <Link to="/blog" className="!text-[#000]">
                  Blog
                </Link>
              </div>

              <div
                className="flex flex-col gap-4 !text-[#000]"
                onClick={() => setMenuVisible(false)}
              >
                {Cookies.get("isLogined") == "1" && (
                  <>
                    <Link to="/help">
                      <span className="text-base !text-[#000]">Help</span>
                    </Link>
                    <Link to="/center">
                      <span className="text-base !text-[#000]">Chatbots</span>
                    </Link>
                    <Link to="/account/info">
                      <Button className="fw-500 !rounded-2 !w-124px !h-10 !border-#040608 !text-[#000] !text-16px">
                        Account →
                      </Button>
                    </Link>
                  </>
                )}

                {Cookies.get("isLogined") != "1" && !isLogin && (
                  <>
                    <Link to="/login">
                      <span className="text-base !text-[#000]">Log in</span>
                    </Link>
                    <Link to="/signUp">
                      <Button
                        className="!fw-500 !w-124px !h-10 !border-#040608 !text-#000"
                        onClick={() => sendTAFn("try for free")}
                      >
                        Try for Free →
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Drawer>
        </Content>
      )}
    </>
  );
}
