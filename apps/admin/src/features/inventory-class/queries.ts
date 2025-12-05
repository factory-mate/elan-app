import { InventoryClassAPI } from './api'
import { detailQK, fullListQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => InventoryClassAPI.tree(signal)
  })

export const fullListQO = (params: FullPageDto) =>
  queryOptions({
    queryKey: fullListQK(params),
    queryFn: ({ signal }) => InventoryClassAPI.fullList(params, signal),
    placeholderData: keepPreviousData
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => InventoryClassAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => InventoryClassAPI.detail(id!, signal),
    enabled: !!id
  })
