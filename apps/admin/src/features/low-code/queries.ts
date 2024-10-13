import { STALE } from '@/shared/query-client'

import { LowCodeAPI } from './api'
import { lowCodeConfigQK } from './query-keys'

export const lowCodeConfigQO = (modelCode: string) =>
  queryOptions({
    queryKey: lowCodeConfigQK(modelCode),
    queryFn: ({ signal }) => LowCodeAPI.getConfig({ modelCode }, signal),
    staleTime: STALE.INFINITY
  })
