import type { PageDto } from '@/features/pagination'

import { UnitClassAPI } from './api'
import { detailQK, fullListQK, listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => UnitClassAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => UnitClassAPI.fullList(signal)
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => UnitClassAPI.detail(id!, signal),
    enabled: !!id
  })
