import { useEffect, useState } from "react";
import { useInterval, useBoolean } from "react-use";
import { Form, Input, Button, message } from "antd";
import { sendTA } from "@/assets/js/TA";
import Cookies from "js-cookie";
import { emailRegister, emailVerifyCode } from "@/api/login";
import { getUserInfoApi } from "@/api/bot";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useGlobalData } from "@/store/user";
import { Google } from "./Google";
export function Component() {
  const { updateUserInfo } = useGlobalData((state: any) => state);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams() as any;
  const [scroll, setScroll] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const redirectUrl = decodeURIComponent(
    `${searchParams.get("r") ?? "/center"}`
  );

  useEffect(() => {
    setScroll(window.innerHeight > 750);
    const updateWindowHeight = () => {
      setScroll(window.innerHeight > 750);
    };
    window.addEventListener("resize", updateWindowHeight);
    return () => {
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);

  const [form] = Form.useForm();
  const emailValue = Form.useWatch("email", form);
  const passwordValue = Form.useWatch("password", form);

  const [passwordError, setPasswordError] = useState(false);
  const [shortLoading, setShortLoading] = useState(false);

  const [time, setTime] = useState(60);
  const [isRunning, toggleIsRunning] = useBoolean(false);

  useInterval(
    () => {
      setTime((prevTime: number) => {
        if (prevTime <= 1) {
          toggleIsRunning();
          return 60;
        }

        return prevTime - 1;
      });
    },
    isRunning ? 1000 : null
  );

  /**获取验证码 */
  function getShortFn() {
    if (!emailValue) {
      messageApi.error("Please enter your email address");
      return;
    }
    if (!passwordValue) {
      messageApi.error("Please enter your password");
      return;
    }

    if (passwordValue.length < 6 || passwordValue.length > 20) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    setShortLoading(true);
    emailRegister({
      email: emailValue,
      password: passwordValue,
    })
      .then(({ data }: any) => {
        if (+data.error_code === 0) {
          messageApi.success(
            "Please check your email verification code carefully"
          );
          toggleIsRunning();
        } else {
          throw data;
        }
      })
      .catch((err: any) => {
        let msg =
          err?.error_msg || "Interface request failed, please try again later";
        if ([20002, 40022].includes(+err.error_code)) {
          msg =
            "The verification code cannot be sent repeatedly within 60 seconds";
        }
        messageApi.error(msg);
      })
      .finally(() => {
        setShortLoading(false);
      });
  }

  const [signUpLoading, setSignUpLoading] = useState(false);

  const onFinish = async (values: any) => {
    // 验证码框敲击回车的时候，也会自动触发
    sendTA("XWEB_CLICK", {
      name: "register",
      style: "sign_up",
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
    if (!values.short) {
      messageApi.error("Please enter your code");
      return;
    }
    setSignUpLoading(true);

    emailVerifyCode({
      code: values.short,
    })
      .then(({ data }: any) => {
        if (+data.error_code === 0) {
          getUserInfoApi()
            .then(async (res) => {
              sendTA("XWEB_CLICK", {
                name: "register",
                style: "register_success",
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
              messageApi.error("Register failed, please try again later");
              setSignUpLoading(false);
            });
        } else {
          throw data?.error_msg;
        }
      })

      .catch((err: any) => {
        messageApi.error(err || "Register failed, please try again later");
        setSignUpLoading(false);
      });
  };

  return (
    <>
      {contextHolder}
      <div className="w-full h-100vh !absolute left-0 top-0 bg-[#fff] pt-16">
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
              Get started for free
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
                <div>
                  <Input.Password
                    autoComplete=""
                    placeholder="Password"
                    className="!bg-[#F0F0F0] !rounded-2 w-full !px-5  !h-10 !leading-10 !text-[#040608] !text-4 !fw-500 !focus:shadow-none !b-2 !b-[#F0F0F0] !focus:b-[#040608]"
                    onPressEnter={(e) => {
                      e.preventDefault();
                    }}
                  />
                  {passwordError && (
                    <div className="w-full text-[#040608] text-4.5 fw-300 flex flex-items-center">
                      <img
                        className="w-4.5 h-4.5 mr-1"
                        src="/assets/img/login/login_error.png"
                      />
                      Password between 6 to 20 characters
                    </div>
                  )}
                </div>
              </Form.Item>

              <Form.Item label="Code" name="short">
                <div>
                  <Input
                    autoComplete=""
                    maxLength={6}
                    placeholder="Code"
                    className="!bg-[#F0F0F0] code !rounded-2 w-full !px-5 !pr-30 !h-10 !leading-10 !text-[#040608] !text-4 !fw-500 !focus:shadow-none !b-2 !b-[#F0F0F0] !focus:b-[#040608]"
                    onPressEnter={(e) => {
                      e.preventDefault();
                      form.submit();
                    }}
                  ></Input>
                  <Button
                    className={`!absolute !right-2.5 !top-1/2 transform -translate-y-1/2  !h-8 !w-25  ${
                      isRunning || shortLoading
                        ? "!bg-[#CDCDCE]"
                        : "!bg-[#040608]"
                    } !text-white !text-3.5 !fw-400  !b-none   !rounded-1`}
                    disabled={isRunning || shortLoading}
                    onClick={getShortFn}
                  >
                    {isRunning ? `${time}s` : "Get code"}
                  </Button>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    background:
                      "linear-gradient(90deg, #83e10a 0%, #0ac655 100%)",
                  }}
                  htmlType="submit"
                  loading={signUpLoading}
                  className="w-full !h-10 !text-4 !text-white !fw-700 !rounded-2 text-center !b-0"
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>
            <div className="w-full h-12 mb-1 text-[#040608] text-4 fw-300 flex flex-justify-center">
              Already have an account?
              <Link
                className="fw-700 ml-5 cursor-pointer"
                to="/login"
                onClick={() => {
                  sendTA("XWEB_CLICK", {
                    name: "register",
                    style: "sign_in",
                    container: Cookies.get("userId"),
                  });
                }}
              >
                Sign in
              </Link>
            </div>

            <div className="w-full h-0.25 mb-8 bg-[#E6E6E6] flex">
              <span className="px-2 bg-[#fff] text-3 fw-400 text-[#818283] w-35 h-3.25 leading-3.25 mt--1.5 ml-[calc(50%-70px)]">
                OR CONTINUE WITH
              </span>
            </div>

            <Google from="register" />

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
      </div>
    </>
  );
}
