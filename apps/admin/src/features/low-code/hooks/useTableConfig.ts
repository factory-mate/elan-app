import { lowCodeConfigQK } from '../query-keys'
import type { LowCodeTableConfig, LowCodeTransformedConfig } from '../types'

export const useTableConfig = (): LowCodeTableConfig => {
  const { modelCode } = useRouteStaticData()

  const data = useMemo<LowCodeTableConfig>(() => {
    const defaultData = { cols: [], actionButtons: [] }
    if (!modelCode) {
      return defaultData
    }
    return (
      queryClient.getQueryData<LowCodeTransformedConfig>(lowCodeConfigQK(modelCode))?.table ??
      defaultData
    )
  }, [modelCode])

  return data
}
