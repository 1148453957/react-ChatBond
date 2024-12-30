import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { Dropdown, Button, Drawer, Spin, Progress } from "antd";
import { useLocation, NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { sendTA } from "@/assets/js/TA";
import Cookies from "js-cookie";
import { useGlobalData } from "@/store/user";

import { Component as File } from "./File";

const Content = styled.div`
  && {
    .ant-drawer {
      .ant-drawer-content-wrapper {
        width: 184px !important;

        .ant-drawer-body {
          padding: 0 !important;
        }
      }
    }
    .createProgress {
      .ant-progress-outer {
        margin-inline-end: 0 !important;
        padding-inline-end: 0 !important;
      }

      .ant-progress-inner {
        border-radius: 8px !important;
      }

      .ant-progress-text {
        position: absolute !important;
        top: 50% !important;
        right: 0;
        transform: translateY(-50%) !important;
      }
    }
  }
`;
export function Component() {
  const pathname = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    sendTA("XWEB_SHOW", {
      name: "chatbot_train",
      container: Cookies.get("userId"),
    });
  }, []);

  const [createPercent, setCreatePercent] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  function turnTo(type: string) {
    setMenuVisible(false);
    switch (type) {
      case "file":
      case "text":
      case "website":
      case "question":
      case "notion":
        navigate(`/create/${type}`);
        console.log(4444);

        break;

      default:
        break;
    }
  }

  const [uploadedInfo, setUploadedInfo] = useState({
    textContent: "",
    fileList: [],
    totalCharactersLimit: 0,
    totalCharactersSum: 0, //总和（文本+文件）
    textCharactersSum: 0, //文本
    fileCharactersSum: 0, //文件
    websiteCharactersSum: 0,
    websiteList: [],
    questionAnswerPairsCharactersSum: 0,
    questionAnswerPairsList: [],
    notionCharactersSum: 0,
    notionResourceList: [],
  });

  /**增加文件 */
  const onFileListAdd = (obj: any) => {};

  /**删除单个文件 */
  const onFileDelete = (obj: any) => {};
  /**上传文件或者抓取网页期间，不能训练 */
  const [trainDisabled, setTrainDisabled] = useState(false);
  const { userInfo, updateUserInfo } = useGlobalData((state: any) => state);

  const limitCount = userInfo.totalNumber || 400000;
  // 使用 useCallback 缓存回调函数
  // useCallback 接受一个回调函数和依赖项数组，当依赖项数组中的值发生变化时，它会返回新的回调函数
  // useCallback 的主要目的是确保子组件不必在每次渲染时重新创建相同的回调函数
  const createBot = (obj: any) => {
    updateUserInfo({
      userId: 24,
      subscriptionDetails: {
        botCharacterNumber: 15,
      },
    });
  };

  return (
    <>
      <Content className="w-full h-full bg-[#fff] mt--16 pt-16 relative">
        <div className="w-full text-center mx-auto">
          <h1 className="text-8 mt-20 fw-700">Data Sources</h1>
          <h5 className="text-[#686A6B] text-5 mb-6">
            Add your data sources to train your chatbot
          </h5>
        </div>
        {/* 移动端菜单 */}
        <div className="md:hidden block mb-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pr-4">
            <div className="relative flex h-6 items-center justify-end">
              <Dropdown
                trigger={["click"]}
                dropdownRender={() => (
                  <div className="bg-white w-180px b-1 rd-2 shadow-lg">
                    <NavLink
                      to="/create/file"
                      className={({ isActive }) =>
                        isActive ? "fw-600" : "gap-3"
                      }
                    >
                      <div className="flex flex-items-center text-sm relative my-3 pl-3">
                        <img
                          src="/assets/img/icon_file.png"
                          className="w-6 mr-2"
                        />
                        <h4 className="text-#040608 mb-0">Files</h4>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/create/text"
                      className={({ isActive }) =>
                        isActive ? "fw-600" : "gap-3"
                      }
                    >
                      <div className="flex flex-items-center text-sm relative pb-3 pl-3">
                        <img
                          src="/assets/img/icon_text.png"
                          className="w-6 mr-2"
                        />
                        <h4 className="text-#040608 mb-0">Text</h4>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/create/website"
                      className={({ isActive }) =>
                        isActive ? "fw-600" : "gap-3"
                      }
                    >
                      <div className="flex flex-items-center text-sm relative pb-3 pl-3">
                        <img
                          src="/assets/img/icon_link.png"
                          className="w-6 mr-2"
                        />
                        <h4 className="text-#040608 mb-0">Website</h4>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/create/question"
                      className={({ isActive }) =>
                        isActive ? "fw-600" : "gap-3"
                      }
                    >
                      <div className="flex flex-items-center text-sm relative pb-3 pl-3">
                        <img
                          src="/assets/img/icon_qa.png"
                          className="w-6 mr-2"
                        />
                        <h4 className="text-#040608 mb-0">Question</h4>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/create/notion"
                      className={({ isActive }) =>
                        isActive ? "fw-600" : "gap-3"
                      }
                    >
                      <div className="flex flex-items-center text-sm relative pb-3 pl-3">
                        <img
                          src="/assets/img/icon_link.png"
                          className="w-6 mr-2"
                        />
                        <h4 className="text-#040608 mb-0">Notion</h4>
                      </div>
                    </NavLink>
                  </div>
                )}
              >
                <MenuOutlined className="mr-4 text-2xl leading-none" />
              </Dropdown>
            </div>
          </div>
        </div>
        <Spin spinning={createPercent != 0} tip="Training...">
          <div className="flex flex-col md:flex-row flex-justify-center pt-4">
            <div className="hidden md:flex w-40 h-full flex-shrink-0 flex-col">
              <div
                className={`${
                  pathname.startsWith("/create/file")
                    ? "bg-[#F0F0F0]"
                    : " text-[#040608]"
                }   text-4 cursor-pointer w-full h-10 justify-center flex flex-items-center rounded-1`}
                onClick={() => turnTo("file")}
              >
                {pathname.startsWith("/create/file") ? (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_file_active.png"
                  />
                ) : (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_file.png"
                  />
                )}

                <span className="w-30px text-left">File</span>
              </div>
              <div
                className={`${
                  pathname.startsWith("/create/text")
                    ? "bg-[#F0F0F0]"
                    : " text-[#040608]"
                } mt-2  text-4 cursor-pointer w-full h-10 justify-center flex flex-items-center rounded-1`}
                onClick={() => turnTo("text")}
              >
                {pathname.startsWith("/create/text") ? (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_text_active.png"
                  />
                ) : (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_text.png"
                  />
                )}

                <span className="w-30px text-left">Text</span>
              </div>
              <div
                className={`${
                  pathname.startsWith("/create/website")
                    ? "bg-[#F0F0F0]"
                    : " text-[#040608]"
                } mt-2  text-4 cursor-pointer w-full h-10 justify-center flex flex-items-center rounded-1`}
                onClick={() => turnTo("website")}
              >
                {pathname.startsWith("/create/website") ? (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_link_active.png"
                  />
                ) : (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_link.png"
                  />
                )}
                <span className="w-30px text-left">Website</span>
              </div>
              <div
                className={`${
                  pathname.startsWith("/create/question")
                    ? "bg-[#F0F0F0]"
                    : " text-[#040608]"
                } mt-2  text-4 cursor-pointer w-full h-10 justify-center flex flex-items-center rounded-1`}
                onClick={() => turnTo("question")}
              >
                {pathname.startsWith("/create/question") ? (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_qa_active.png"
                  />
                ) : (
                  <img className="w-6 h-6 mr-3" src="/assets/img/icon_qa.png" />
                )}
                <span className="w-30px text-left">Question</span>
              </div>
              <div
                className={`${
                  pathname.startsWith("/create/notion")
                    ? "bg-[#F0F0F0]"
                    : " text-[#040608]"
                } mt-2  text-4 cursor-pointer w-full h-10 justify-center flex flex-items-center rounded-1`}
                onClick={() => turnTo("notion")}
              >
                {pathname.startsWith("/create/notion") ? (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_link_active.png"
                  />
                ) : (
                  <img
                    className="w-6 h-6 mr-3"
                    src="/assets/img/icon_link.png"
                  />
                )}
                <span className="w-30px text-left">Notion</span>
              </div>
            </div>
            <div className="md:w-255 lg:w-285 flex flex-col lg:flex-row">
              <div className="flex-1 h-[calc(100%-40px)] md:h-full mx-4">
                {pathname.startsWith("/create/file") ? (
                  <File
                    isCreate={true}
                    uploadedInfo={uploadedInfo}
                    onFileListAdd={onFileListAdd}
                    onFileDelete={onFileDelete}
                    trainDisabledChange={(val:boolean) => setTrainDisabled(val)}
                  />
                ) : (
                  <></>
                )}

                {/*  <Text
              v-show="active === 'Text'"
              @onTextChange="onTextChange"
              v-model:value="uploadedInfo.text"
            />

            <Website
              v-show="active === 'Website'"
              :uploadedInfo="uploadedInfo"
              @onWebSiteListAdd="onWebSiteListAdd"
              @onWebSiteListDelete="onWebSiteListDelete"
              @onWebSiteChange="onWebSiteChange"
              @onWebSiteDelete="onWebSiteDelete"
              @trainDisabledChange="trainDisabledChange"
            />
            <Question
              ref="questionRef"
              v-show="active === 'Question'"
              @onQuestionAdd="onQuestionAdd"
              @onQuestionChange="onQuestionChange"
              @onQuestionDelete="onQuestionDelete"
              @onQuestionListDelete="onQuestionListDelete"
              :uploadedHistoryInfo="uploadedInfo"
            />
            <Notion
              v-if="active === 'Notion'"
              @onNotionDeleteChange="onNotionDeleteChange"
              @onNotionAddChange="onNotionAddChange"
              :uploadedHistoryInfo="uploadedInfo"
              @trainDisabledChange="trainDisabledChange"
            /> */}
              </div>
              <div className="w-[calc(100%-32px)] mx-4 my-8 lg:w-65 lg:mx-0 lg:my-0">
                <div className="rounded-3 border p-4">
                  <div className="text-left text-5 font-semibold lg:mb-2">
                    Sources
                  </div>
                  <div className="mb-4 flex flex-col gap-3">
                    <p className="flex justify-between bg-#F7F8F8 p-2">
                      <span className="text-#363839">
                        {uploadedInfo.fileList.length} Files
                      </span>
                      <span className="fw-500">
                        {uploadedInfo.fileCharactersSum} chars
                      </span>
                    </p>
                    <p className="flex justify-between bg-#F7F8F8 p-2">
                      <span className="text-#363839">Text</span>
                      <span className="fw-500">
                        {uploadedInfo.textCharactersSum} chars
                      </span>
                    </p>
                    <p className="flex justify-between bg-#F7F8F8 p-2">
                      <span className="text-#363839">
                        {uploadedInfo.websiteList.length} Link
                      </span>
                      <span className="fw-500">
                        {uploadedInfo.websiteCharactersSum} chars
                      </span>
                    </p>
                    <p className="flex justify-between bg-#F7F8F8 p-2">
                      <span className="text-#363839">
                        {uploadedInfo.questionAnswerPairsList.length} Q&A
                      </span>
                      <span className="fw-500">
                        {uploadedInfo.questionAnswerPairsCharactersSum} chars
                      </span>
                    </p>
                    <p className="flex justify-between bg-#F7F8F8 p-2">
                      <span className="text-#363839">
                        {uploadedInfo.notionResourceList.length} Pages
                      </span>
                      <span className="fw-500">
                        {uploadedInfo.notionCharactersSum} chars
                      </span>
                    </p>
                  </div>
                  <p className="flex flex-col text-sm">
                    <span className="text-left font-semibold mt-2 mb-3">
                      Total detected characters：{" "}
                    </span>
                    <span className="flex justify-center font-bold my-4">
                      <span
                        className={`${
                          uploadedInfo.totalCharactersSum > limitCount
                            ? "text-#fe2407"
                            : "text-#0AC655"
                        } text-18px mr-1`}
                      >
                        {uploadedInfo.totalCharactersSum}
                      </span>
                      <span className="text-#040608">/ {limitCount} limit</span>
                    </span>
                  </p>

                  {createPercent === 0 ? (
                    <Button
                      onClick={createBot}
                      disabled={trainDisabled}
                      className="primary-btn !fw-700 !text-18px inline-flex items-center justify-center whitespace-nowrap rounded-md !h-54px px-4 my-2 w-full"
                    >
                      Create Chatbot
                    </Button>
                  ) : (
                    <Progress
                      className="!my-4 createProgress !rounded-2"
                      stroke-linecap="square"
                      stroke-color={{
                        "0%": "#83E10A",
                        "}100%": "#0AC655",
                      }}
                      size={40}
                      percent={createPercent}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Content>
    </>
  );
}
