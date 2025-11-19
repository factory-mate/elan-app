import { skipToken } from '@tanstack/react-query'

import { BOMContentAPI } from './api'
import { listQK } from './query-keys'
import type { BOMContentDto } from './types'

export const listQO = (params: BOMContentDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: params.cParentInvCode ? ({ signal }) => BOMContentAPI.list(params, signal) : skipToken,
    placeholderData: keepPreviousData
  })
