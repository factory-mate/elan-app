import { VendorClassAPI } from './api'
import { detailQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => VendorClassAPI.tree(signal)
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => VendorClassAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => VendorClassAPI.detail(id!, signal),
    enabled: !!id
  })
