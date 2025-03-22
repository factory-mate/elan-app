import { ProductionOrderAPI } from './api'
import { bomListQK, detailBodysQK, detailQK, listQK, printDetailQK } from './query-keys'

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => ProductionOrderAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => ProductionOrderAPI.detail(id!, signal),
    enabled: !!id
  })

export const detailBodysQO = (id?: string) =>
  queryOptions({
    queryKey: detailBodysQK(id!),
    queryFn: ({ signal }) => ProductionOrderAPI.detailBodys(id!, signal),
    enabled: !!id
  })

export const bomListQO = (id?: string) =>
  queryOptions({
    queryKey: bomListQK(id!),
    queryFn: ({ signal }) => ProductionOrderAPI.bomList(id!, signal),
    enabled: !!id
  })

export const printDetailQO = (id?: string) =>
  queryOptions({
    queryKey: printDetailQK(id!),
    queryFn: ({ signal }) => ProductionOrderAPI.printDetail(id!, signal),
    enabled: !!id
  })
