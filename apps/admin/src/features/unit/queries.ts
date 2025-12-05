import { UnitAPI } from './api'
import { detailQK, fullListQK, listQK } from './query-keys'

export const fullListQO = (params: FullPageDto) =>
  queryOptions({
    queryKey: fullListQK(params),
    queryFn: ({ signal }) => UnitAPI.fullList(params, signal)
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => UnitAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => UnitAPI.detail(id!, signal),
    enabled: !!id
  })
