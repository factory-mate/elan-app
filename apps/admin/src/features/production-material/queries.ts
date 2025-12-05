import { ProductionMaterialAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => ProductionMaterialAPI.getList(params, signal),
    placeholderData: keepPreviousData
  })
