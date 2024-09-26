import { useEffect, useState } from "react";
import { useInterval, useBoolean } from "react-use";
import { Form, Input, Button } from "antd";
import { message } from "@/components/Message";
import { resetPassword, resetPasswordVerifyCode } from "@/api/login";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  && .ant-form {
    .ant-form-item-control-input-content {
      position: relative;
    }

    .ant-form-item {
      margin-bottom: 20px;

      &.btn {
        padding-top: 12px;
      }

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
`;
export function Component() {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(window.innerHeight > 750);

  useEffect(() => {

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
      message.error("Please enter your email address");
      return;
    }
    if (!passwordValue) {
      message.error("Please enter your password");
      return;
    }

    if (passwordValue.length < 6 || passwordValue.length > 20) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    setShortLoading(true);
    resetPassword({
      email: emailValue,
    })
      .then(({ data }: any) => {
        if (+data.error_code === 0) {
          message.success(
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
        message.error(msg);
      })
      .finally(() => {
        setShortLoading(false);
      });
  }

  const [signUpLoading, setSignUpLoading] = useState(false);

  const onFinish = async (values: any) => {
    // 验证码框敲击回车的时候，也会自动触发

    if (!values.email) {
      message.error("Please enter your email address");
      return;
    }
    if (!values.password) {
      message.error("Please enter your password");
      return;
    }
    if (values.password.length < 6 || values.password.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    if (!values.short) {
      message.error("Please enter your code");
      return;
    }
    setSignUpLoading(true);

    resetPasswordVerifyCode({
      code: values.short,
      password: values.password,
    })
      .then(({ data }: any) => {
        if (+data.error_code === 0) {
          navigate("/login");
          message.success("Password reset successful");
        } else {
          throw data?.error_msg;
        }
      })

      .catch((err: any) => {
        message.error(err || "Password reset failed, please try again later");
        setSignUpLoading(false);
      });
  };

  return (
    <>
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
              Reset Password
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
              <Form.Item label="New Password" name="password">
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

              <Form.Item className="btn">
                <Button
                  style={{
                    background:
                      "linear-gradient(90deg, #83e10a 0%, #0ac655 100%)",
                  }}
                  htmlType="submit"
                  loading={signUpLoading}
                  className=" w-full !h-10 !text-4 !text-white !fw-700 !rounded-2 text-center !b-0"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
            <div className="w-full h-12 mb-1 text-[#040608] text-4 fw-300 flex flex-justify-center">
              Remember your password?
              <Link className="fw-700 ml-5 cursor-pointer" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
