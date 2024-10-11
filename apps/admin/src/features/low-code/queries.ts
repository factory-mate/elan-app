import { STALE } from '@/shared/query-client'

import type { PageParams, PageResponse } from '../pagination'
import { LowCodeAPI } from './api'
import { lowCodeConfigQK, lowCodePageQueryQK } from './query-keys'
import type { LowCodePageQueryConfig } from './types'

export const lowCodeConfigQO = (modelCode: string) =>
  queryOptions({
    queryKey: lowCodeConfigQK(modelCode),
    queryFn: ({ signal }) => LowCodeAPI.getConfig({ modelCode }, signal),
    staleTime: STALE.INFINITY
  })

export const lowCodePageQueryQO = <T = unknown>(
  config: LowCodePageQueryConfig,
  params: PageParams
) =>
  queryOptions<PageResponse<T>>({
    queryKey: lowCodePageQueryQK(config, params),
    queryFn: ({ signal }) => LowCodeAPI.getList<T>(config, params, signal)
  })
