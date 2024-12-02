import type { PageDto } from '@/features/pagination'

import { SupplierClassAPI } from './api'
import { detailQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => SupplierClassAPI.tree(signal)
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => SupplierClassAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => SupplierClassAPI.detail(id!, signal),
    enabled: !!id
  })
