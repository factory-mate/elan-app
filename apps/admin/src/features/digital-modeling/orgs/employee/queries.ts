import type { PageDto } from '@/features/pagination'

import { EmployeeAPI } from './api'
import { detailQK, listQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => EmployeeAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => EmployeeAPI.detail(id!, signal),
    enabled: !!id
  })
