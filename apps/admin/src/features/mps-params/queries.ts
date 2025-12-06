import { MpsParamsAPI } from './api'
import { fullListQK } from './query-keys'

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => MpsParamsAPI.fullList(signal),
    placeholderData: keepPreviousData
  })
