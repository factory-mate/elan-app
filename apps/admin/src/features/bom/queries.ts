import { BOMAPI } from './api'
import { NOT_FOUND_UID } from './constants'
import { childListQK, detailQK, fullListQK, listQK, treeQK } from './query-keys'

export const treeQO = (where: string) =>
  queryOptions({
    queryKey: treeQK(where),
    queryFn: ({ signal }) => BOMAPI.tree(where, signal)
  })

export const fullListQO = (params: FullPageDto) =>
  queryOptions({
    queryKey: fullListQK(params),
    queryFn: ({ signal }) => BOMAPI.fullList(params, signal),
    placeholderData: keepPreviousData
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => BOMAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => BOMAPI.detail(id!, signal),
    enabled: !!id && id !== NOT_FOUND_UID
  })

export const childListQO = (id?: string) =>
  queryOptions({
    queryKey: childListQK(id!),
    queryFn: ({ signal }) => BOMAPI.getBodys(id!, signal),
    enabled: !!id && id !== NOT_FOUND_UID
  })
