import type { PageDto } from '@/features/pagination'

import { SupplierAPI } from './api'
import { detailQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => SupplierAPI.tree(signal)
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => SupplierAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => SupplierAPI.detail(id!, signal),
    enabled: !!id
  })
