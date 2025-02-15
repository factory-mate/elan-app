import { BOMCostAPI } from './api'
import { listQK } from './query-keys'
import type { BOMCostDto } from './types'

export const listQO = (params: BOMCostDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => BOMCostAPI.getCost(params, signal),
    placeholderData: keepPreviousData
  })
