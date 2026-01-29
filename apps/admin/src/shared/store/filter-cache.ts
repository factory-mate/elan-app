import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface State {
  cache: Map<string, any>
}

interface Actions {
  setItem: (key: string, value: any) => void
  getItem: <T = any>(key: string) => T | undefined
  removeItem: (key: string) => void
  clearAll: () => void
  size: () => number
}

const initialState: State = {
  cache: new Map<string, any>()
}

export const useFilterCacheStore = create<State & Actions>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      setItem: (key, value) =>
        set((state) => {
          state.cache.set(key, value)
        }),
      getItem: (key) => get().cache.get(key),
      hasItem: (key: string) => get().cache.has(key),
      removeItem: (key) =>
        set((state) => {
          state.cache.delete(key)
        }),
      clearAll: () => set(() => ({ cache: new Map() })),
      size: () => get().cache.size
    }))
  )
)
