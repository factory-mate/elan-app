import type { PageDto } from '@/features/pagination'

import { InventoryClassAPI } from './api'
import { detailQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => InventoryClassAPI.tree(signal)
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
