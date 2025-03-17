import type { FullPageDto } from '@/shared/types'

import { RoleAPI } from './api'
import { detailQK, fullListQK, listQK, userRoleFullListQK } from './query-keys'

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => RoleAPI.fullList(signal),
    placeholderData: keepPreviousData
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => RoleAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => RoleAPI.detail(id!, signal),
    enabled: !!id
  })

export const userRoleFullListQO = (params: FullPageDto) =>
  queryOptions({
    queryKey: userRoleFullListQK(params),
    queryFn: ({ signal }) => RoleAPI.userRoleFullList(params, signal),
    placeholderData: keepPreviousData
  })
