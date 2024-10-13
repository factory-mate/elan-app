import { lowCodeConfigQO } from '../queries'
import type { LowCodeTableConfig } from '../types'

export const useTableConfig = (): LowCodeTableConfig => {
  const { modelCode } = useRouteStaticData()

  const {
    data: {
      table: { cols, actionButtons, api }
    }
  } = useSuspenseQuery(lowCodeConfigQO(modelCode!))

  return { cols, actionButtons, api }
}
