import { useResponsive } from 'ahooks'

interface ResponsiveColSpan {
  xxl?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

export const useResponsiveColSpan = (config?: ResponsiveColSpan) => {
  const { xxl = 6, xl = 6, lg = 8, md = 12, sm = 24, xs = 24 } = config ?? {}

  const responsive = useResponsive()

  if (responsive.xxl) {
    return xxl
  }
  if (responsive.xl) {
    return xl
  }
  if (responsive.lg) {
    return lg
  }
  if (responsive.md) {
    return md
  }
  if (responsive.sm) {
    return sm
  }
  if (responsive.xs) {
    return xs
  }
  return 24
}
