import { create } from 'zustand'

export const useGlobalData = create((set) => ({
  userInfo: {
    userId: 0,
    email: '',
    equityName: '',
    displayName: '',
    thirdCustomerId: '',
    thirdSubscriptionId: '',
    subscriptionExpireTime: 0,
    subscriptionId: '',
    apiKeys: [],
    subscriptionDetails: {},
    botNumber:0,
    totalNumber:0,
  },
  updateUserInfo: (val:any) => set({ userInfo: {...val,

    botNumber:val.subscriptionDetails?.botNumber||0,
    totalNumber:val.subscriptionDetails?.botCharacterNumber||0,
  } }),
}))
