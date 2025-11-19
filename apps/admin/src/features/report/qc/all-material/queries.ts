import { AllMaterialAPI } from './api'
import { listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => AllMaterialAPI.list(params, signal),
    placeholderData: keepPreviousData
  })
