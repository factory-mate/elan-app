import { ProductionDateDiffAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => ProductionDateDiffAPI.getList(params, signal),
    placeholderData: keepPreviousData
  })
