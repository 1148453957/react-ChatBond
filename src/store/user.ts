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
  },
  updateUserInfo: (val:any) => set({ userInfo: val }),
}))
