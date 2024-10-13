import type { PageDto } from '@/features/pagination'

import { UnitAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => UnitAPI.list(params, signal),
    placeholderData: keepPreviousData
  })
