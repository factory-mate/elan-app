import { CustomerClassAPI } from './api'
import { detailQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => CustomerClassAPI.tree(signal)
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => CustomerClassAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => CustomerClassAPI.detail(id!, signal),
    enabled: !!id
  })
