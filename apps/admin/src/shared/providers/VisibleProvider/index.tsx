import type { PropsWithChildren } from 'react'

interface VisibleProviderProps extends PropsWithChildren {
  /**
   * 是否显示
   */
  visible?: boolean
  /**
   * 不显示时的回退组件
   */
  fallback?: React.ReactNode
}

export function VisibleProvider(props: VisibleProviderProps) {
  const { visible, fallback, children } = props
  return visible ? children : fallback
}
