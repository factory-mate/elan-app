import { skipToken } from '@tanstack/react-query'

import { BOMChangeAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: FullPageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: params.conditions ? ({ signal }) => BOMChangeAPI.list(params, signal) : skipToken,
    placeholderData: keepPreviousData
  })
