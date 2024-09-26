import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { sendTA } from "@/assets/js/TA";
import Cookies from "js-cookie";
import { emailLogin } from "@/api/login";
import { getUserInfoApi } from "@/api/bot";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

import { useGlobalData } from "@/store/user";
import { Google } from "./Google";
import styled from "styled-components";

const Content = styled.div`
  && {
    .ant-form {
      .ant-form-item-control-input-content {
        position: relative;
      }

      .ant-form-item {
        margin-bottom: 20px;
        .ant-form-item-label {
          padding-bottom: 4px;

          label {
            color: #040608;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }
  }
`;
export function Component() {
  const { updateUserInfo } = useGlobalData((state: any) => state);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams() as any;
  const [scroll, setScroll] = useState(window.innerHeight > 750);
  const [messageApi, contextHolder] = message.useMessage();

  const redirectUrl = decodeURIComponent(
    `${searchParams.get("r") ?? "/center"}`
  );

  useEffect(() => {
    sendTA("XWEB_SHOW", {
      name: "login",
      container: Cookies.get("userId"),
    });
    const updateWindowHeight = () => {
      setScroll(window.innerHeight > 750);
    };
    window.addEventListener("resize", updateWindowHeight);
    return () => {
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);

  const [form] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const onFinish = async (values: any) => {
    // 密码框敲击回车的时候，也会自动触发
    sendTA("XWEB_CLICK", {
      name: "login",
      style: "sign_in",
      container: Cookies.get("userId"),
    });

    if (!values.email) {
      messageApi.error("Please enter your email address");
      return;
    }
    if (!values.password) {
      messageApi.error("Please enter your password");
      return;
    }
    setLoginLoading(true);
    emailLogin(values)
      .then(({ data }: any) => {
        if (+data.error_code === 0) {
          getUserInfoApi()
            .then(async (res) => {
              sendTA("XWEB_CLICK", {
                name: "login",
                style: "login_success",
                container: data.data.supa_no,
              });
              Cookies.set("userId", data.data.supa_no, {
                domain:
                  import.meta.env.VITE_RUN_ENV == "prod"
                    ? ".chatbond.co"
                    : ".aecoapps.com",
              });

              Cookies.set("isLogined", "1", {
                domain:
                  import.meta.env.VITE_RUN_ENV == "prod"
                    ? ".chatbond.co"
                    : ".aecoapps.com",
              });
              updateUserInfo(res.data);
              navigate(redirectUrl);
            })
            .catch(() => {
              messageApi.error("Login failed, please try again later");
              setLoginLoading(false);
            });
        } else {
          throw data?.error_msg;
        }
      })
      .catch((err: any) => {
        messageApi.error(err || "Login failed, please try again later");
        setLoginLoading(false);
      });
  };

  return (
    <>
      {contextHolder}
      <Content
        className={`w-full h-100vh !absolute left-0 top-0 bg-[#fff] pt-16`}
      >
        <img
          className="w-35.7vw absolute top-0 right-0 z-2"
          src="/assets/img/login/login_bg1.svg"
        />
        <img
          className="w-19.58vw absolute bottom-0 left-0 z-2"
          src="/assets/img/login/login_bg2.png"
        />
        <div
          className={`w-full h-full overflow-y-auto flex justify-center ${
            scroll ? "items-center" : ""
          } relative z-3`}
        >
          <div className="w-full px-5 md:w-100 md:px-0 mx-auto">
            <h2
              className={`w-full text-8 h-10 text-[#040608] fw-700 text-center mb-5 ${
                scroll ? "" : "mt-2"
              }`}
            >
              Welcome Back
            </h2>
            <Form
              className="w-full"
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item label="Email" name="email">
                <Input
                  autoComplete=""
                  placeholder="name@example.com"
                  className="!bg-[#F0F0F0] !rounded-2 w-full !px-5 !h-10 !leading-10 !text-[#040608] !text-4 !fw-500 !focus:shadow-none !b-2 !b-[#F0F0F0] !focus:b-[#040608]"
                />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password
                  autoComplete=""
                  placeholder="Password"
                  className="!bg-[#F0F0F0] !rounded-2 w-full !px-5  !h-10 !leading-10 !text-[#040608] !text-4 !fw-500 !focus:shadow-none !b-2 !b-[#F0F0F0] !focus:b-[#040608]"
                  onPressEnter={(e) => {
                    e.preventDefault();
                    form.submit();
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Link
                  to="/resetPassword"
                  className="w-full block !text-[#040608] !text-4 !fw-500 text-right cursor-pointer"
                >
                  Forgot password?
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    background:
                      "linear-gradient(90deg, #83e10a 0%, #0ac655 100%)",
                  }}
                  htmlType="submit"
                  loading={loginLoading}
                  className="w-full !h-10 !text-4 !text-white !fw-700 !rounded-2 text-center !b-0"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <div className="w-full h-12 mb-1 text-[#040608] text-4 fw-300 flex flex-justify-center">
              Don't have an account?
              <Link
                to="/signUp"
                className="fw-700 ml-5 cursor-pointer mt--0.25"
                onClick={() => {
                  sendTA("XWEB_CLICK", {
                    name: "login",
                    style: "sign_up",
                    container: Cookies.get("userId"),
                  });
                }}
              >
                Sign up
              </Link>
            </div>

            <div className="w-full h-0.25 mb-8 bg-[#E6E6E6] flex">
              <span className="px-2 bg-[#fff] text-3 fw-400 text-[#818283] w-35 h-3.25 leading-3.25 mt--1.5 ml-[calc(50%-70px)]">
                OR CONTINUE WITH
              </span>
            </div>
            <Google from="login" />
            <div className="w-80 mx-auto h-12 mb-8 text-[#040608] text-3.5 fw-300 flex flex-justify-center flex-wrap">
              By continuing, you agree to our
              <br />
              <a href="user.html" className="ml-1 underline">
                Terms of Service
              </a>{" "}
              and
              <a href="privacy.html" className="ml-1 underline">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
