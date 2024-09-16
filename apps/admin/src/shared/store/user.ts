import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { UserInfoVo } from '@/features/auth'

interface State {
  userInfo: UserInfoVo | null
}

interface Actions {
  setUserInfo: (userInfo: UserInfoVo | null) => void
}

const initialState: State = {
  userInfo: null
}

export const useUserStore = create<State & Actions>()(
  persist(
    devtools((set) => ({
      ...initialState,
      setUserInfo: (userInfo) => set(() => ({ userInfo }))
    })),
    {
      name: 'user'
    }
  )
)
