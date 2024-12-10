import type { PageDto } from '@/features/pagination'

import { BOMAPI } from './api'
import { NOT_FOUND_UID } from './constants'
import { childListQK, detailQK, listQK, treeQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: ({ signal }) => BOMAPI.tree(signal)
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
    enabled: !!id && id !== NOT_FOUND_UID,
    select: (data) => ({
      ...data,
      dEffectiveDate: DateUtils.convertToDayjs(data.dEffectiveDate),
      dVersionDate: DateUtils.convertToDayjs(data.dVersionDate)
    })
  })

export const childListQO = (id?: string) =>
  queryOptions({
    queryKey: childListQK(id!),
    queryFn: ({ signal }) => BOMAPI.getBodys(id!, signal),
    enabled: !!id && id !== NOT_FOUND_UID
  })
