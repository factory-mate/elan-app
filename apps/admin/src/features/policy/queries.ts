import { PolicyAPI } from './api'
import { authListQK, detailListQK, detailQK, fullListQK, listQK } from './query-keys'
import type { AuthListDto } from './types'

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => PolicyAPI.fullList(signal),
    placeholderData: keepPreviousData
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => PolicyAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => PolicyAPI.detail(id!, signal),
    enabled: !!id
  })

export const detailListQO = (id?: string) =>
  queryOptions({
    queryKey: detailListQK(id!),
    queryFn: ({ signal }) => PolicyAPI.detailList(id!, signal),
    enabled: !!id
  })

export const authListQO = (params: AuthListDto) =>
  queryOptions({
    queryKey: authListQK(params),
    queryFn: ({ signal }) => PolicyAPI.authList(params, signal),
    placeholderData: keepPreviousData,
    enabled: !!params.val
  })
