import { message as antdMessage } from "antd";

let messageApi: any;
let contextHolder: any;

const initMessageApi = () => {
  [messageApi, contextHolder] = antdMessage.useMessage();
};

const message = {
  success: (content: any, config: any = {}) => {
    messageApi.open({
      type: "success",
      content,
      ...config,
    });
  },
  error: (content: any, config: any = {}) => {
    messageApi.open({
      type: "error",
      content,
      ...config,
    });
  },
};

export { initMessageApi, message, contextHolder };
