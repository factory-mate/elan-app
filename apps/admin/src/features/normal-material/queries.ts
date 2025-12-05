import { skipToken } from '@tanstack/react-query'

import { NormalMaterialAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: params.conditions ? ({ signal }) => NormalMaterialAPI.list(params, signal) : skipToken,
    placeholderData: keepPreviousData
  })
