import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface State {
  cache: Map<string, any>
}

interface Actions {
  setItem: (key: string, value: string) => void
  batchSetItem: (items: { key: string; value: string }[]) => void
  getItem: <T = any>(key: string) => T | undefined
  hasItem: (key: string) => boolean
  removeItem: (key: string) => void
  clearAll: () => void
  getKey: (key: string, gridId?: string) => string
}

const initialState: State = {
  cache: new Map<string, any>()
}

export const useTableCacheStore = create<State & Actions>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      setItem: (key, value) =>
        set((state) => {
          state.cache.set(key, value)
        }),
      batchSetItem: (items) => {
        if (items.length) {
          items.forEach((i) => {
            get().setItem(i.key, i.value)
          })
        }
      },
      getItem: (key) => get().cache.get(key),
      hasItem: (key: string) => get().cache.has(key),
      removeItem: (key) =>
        set((state) => {
          state.cache.delete(key)
        }),
      clearAll: () => set(() => ({ cache: new Map() })),
      getKey: (key, gridId) => (gridId ? `${key}:${gridId}` : key)
    }))
  )
)
