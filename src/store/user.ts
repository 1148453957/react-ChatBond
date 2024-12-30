import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useGlobalData = create(
  immer((set) => ({
    userInfo: {
      userId: 0,
      email: "",
      equityName: "",
      displayName: "",
      thirdCustomerId: "",
      thirdSubscriptionId: "",
      subscriptionExpireTime: 0,
      subscriptionId: "",
      apiKeys: [],
      subscriptionDetails: {},
      botNumber: 0,
      totalNumber: 0,
    },
    /**调用方法重新赋值以后，会重新执行渲染函数 */
    updateUserInfo: (val: any) =>
      set((state: any) => {
        state.userInfo = {
          ...val,
          botNumber: val.subscriptionDetails?.botNumber || 0,
          totalNumber: val.subscriptionDetails?.botCharacterNumber || 0,
        };
      }),
  }))
);
