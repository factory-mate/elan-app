import type { PageDto } from '@/features/pagination'

import { VendorAPI } from './api'
import { detailQK, listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => VendorAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => VendorAPI.detail(id!, signal),
    enabled: !!id
  })
