import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { sendTA } from "@/assets/js/TA";
import { Spin, Button } from "antd";
import { robotListApi } from "@/api/bot";
import { PlusOutlined } from "@ant-design/icons";
import { useGlobalData } from "@/store/user";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Content = styled.div`
  && ._ItemWA {
    --waCardMinWidth: 190px;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--waCardMinWidth), 1fr)
    );

    @media screen and (min-width: 980px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media screen and (max-width: 600px) {
      --waCardMinWidth: 120px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export function Component() {
  const [isLoading, setIsLoading] = useState(true);

  const { userInfo } = useGlobalData((state: any) => state);

  const navigate = useNavigate();

  useEffect(() => {
    sendTA("XWEB_SHOW", {
      name: "Chatbots_page",
      container: Cookies.get("userId"),
    });
    getData();
  }, []);

  const [botList, setBotList] = useState([]);
  const [canCreate, setCanCreate] = useState(true);

  async function getData() {
    try {
      const res = await robotListApi();
      setBotList(res.data);
      setCanCreate(res.data.length < userInfo.botNumber);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAdd() {
    sendTA("XWEB_CLICK", {
      name: "Chatbots_page",
      style: "New Chatbot",
      container: Cookies.get("userId"),
    });
    navigate("/create");
  }
  function handleLink(id: any) {
    sendTA("XWEB_CLICK", {
      name: "Chatbots_page",
      style: "Chatbot",
      container: Cookies.get("userId"),
    });
    navigate(`/bot/Chatbot?id=${id}`);
  }
  return (
    <>
      <Content className="w-full h-[calc(100%-64px)]  bg-#fff text-black/50 p-5 font-[Inter]">
        {isLoading ? (
          <div className="text-center mt-6 ">
            <Spin />
          </div>
        ) : (
          <div className="max-w-[1080px] mx-auto relative">
            <div className="mb-10">
              <h1
                className={`text-8 text-#040608 fw-700 mt-15 text-center   ${
                  botList.length ? "text-left" : ""
                }`}
              >
                Chatbots
              </h1>
              {botList.length && canCreate ? (
                <div className="absolute right-0 top-0 md:top--3">
                  <Button
                    onClick={handleAdd}
                    type="text"
                    className="w-36 !h-10 md:w-204px md:!h-12 text-18px !b-0 !text-#fff !fw-700"
                    style={{
                      background:
                        "var(--Linear, linear-gradient(90deg, #83e10a 0%, #0ac655 100%))",
                    }}
                  >
                    <span>New Chatbot</span>
                    <PlusOutlined
                      style={{ position: "relative", top: " -2px" }}
                    />
                  </Button>
                </div>
              ) : null}
            </div>
            <div className="animate-ease-in border-1 border-#E6E6E6 p-6 text-center rounded-3">
              {botList.length ? (
                <div className="_ItemWA  grid gap-4 md:gap-5 lg:gap-6">
                  {botList.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`relative z10 bg-#F0F0F0 overflow-hidden rd-2 transition-transform hover:scale-105 ${
                        !item.path ? "!cursor-not-allowed" : ""
                      }`}
                    >
                      <div
                        className="flex cursor-pointer"
                        onClick={() => handleLink(item.botId)}
                      >
                        <div className="w-full h-full relative">
                          {item.avatar ? (
                            <img
                              className="w-full object-cover bg-#E6E6E6"
                              src={item.avatar}
                              alt="Chatbond avatar"
                            />
                          ) : (
                            <div className="w-full h-full fcc min-h-130px bg-#E6E6E6 relative">
                              <img
                                className="w-full max-w-25 object-cover"
                                src="/assets/img/default_bg.png"
                                alt="Chatbond defaultBg"
                              />
                            </div>
                          )}
                          <div className="max-h-16 m-3 fw-500 bg-#F0F0F0 text-left break-all text-4 text-black lh-5 text-overflow-2">
                            {item.botName}
                          </div>
                        </div>
                        {/* <Dropdown
                          dropdownRender={() => (
                            <div
                              className="flex items-center"
                              onClick={() => handleClick(item.id)}
                            >
                              <DeleteOutlined />
                              <span className="pl-2">删除</span>
                            </div>
                          )}
                        >
                          <EllipsisOutlined className="absolute top-5 right-5  text-lg cursor-pointer text-black/50 hover:!text-[#000]" />
                        </Dropdown> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Button
                  onClick={handleAdd}
                  type="text"
                  className="!b-0 w-204px !h-12 text-18px !text-#fff !fw-700 my-33"
                  style={{
                    background:
                      "var(--Linear, linear-gradient(90deg, #83e10a 0%, #0ac655 100%))",
                  }}
                >
                  <span>New Chatbot</span>

                  <PlusOutlined
                    style={{ position: "relative", top: " -2px" }}
                  />
                </Button>
              )}
            </div>
          </div>
        )}
      </Content>
    </>
  );
}
