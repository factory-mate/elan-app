import type { PageDto } from '@/features/pagination'

import { ProductionOrderAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => ProductionOrderAPI.list(params, signal),
    placeholderData: keepPreviousData
  })
