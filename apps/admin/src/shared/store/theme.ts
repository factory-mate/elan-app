import { darkThemeConfigPresets, lightThemeConfigPresets } from '@bit-ocean/theme'
import type { ThemeConfig } from 'antd'
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

interface State {
  /**
   * Global light theme configuration.
   */
  lightThemeConfig: ThemeConfig
  /**
   * Global dark theme configuration.
   */
  darkThemeConfig: ThemeConfig
  /**
   * Whether to enable the happy work theme.
   * @default `true`
   */
  enableHappyWorkTheme: boolean
}

interface Actions {
  /**
   * Change the happy work theme.
   */
  setHappyWorkTheme: (enable: boolean) => void
  /**
   * Toggle the happy work theme.
   */
  toggleHappyWorkTheme: () => void
}

const initialState: State = {
  lightThemeConfig: lightThemeConfigPresets,
  darkThemeConfig: darkThemeConfigPresets,
  enableHappyWorkTheme: true
}

export const useThemeStore = create<State & Actions>()(
  subscribeWithSelector(
    devtools((set) => ({
      ...initialState,
      setHappyWorkTheme: (enable: boolean) => set({ enableHappyWorkTheme: enable }),
      toggleHappyWorkTheme: () =>
        set((state) => ({ enableHappyWorkTheme: !state.enableHappyWorkTheme }))
    }))
  )
)
