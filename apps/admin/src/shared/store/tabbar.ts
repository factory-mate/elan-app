import type { TabsProps } from 'antd'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  activeKey: string
  items: NonNullable<TabsProps['items']>
}

interface Actions {
  setActiveKey: (key: string) => void
  addItem: (item: NonNullable<TabsProps['items']>[number]) => void
  removeItem: (key: string) => void
  hasItem: (key: string) => boolean
}

const initialState: State = {
  activeKey: '/',
  items: [{ label: '仪表盘', key: '/', closable: false }]
}

export const useTabbarStore = create<State & Actions>()(
  devtools((set, get) => ({
    ...initialState,
    setActiveKey: (activeKey) => set({ activeKey }),
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
    hasItem: (key) => get().items.some((i) => i.key === key)
  }))
)
