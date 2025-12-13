import { CraftRouteAPI } from './api'
import { detailQK, fullListQK, listforTreeQK, listQK } from './query-keys'

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => CraftRouteAPI.fullList(signal),
    placeholderData: keepPreviousData
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => CraftRouteAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => CraftRouteAPI.detail(id!, signal),
    enabled: !!id
  })

export const listforTreeQO = (id?: string) =>
  queryOptions({
    queryKey: listforTreeQK({
      conditions: `UID = ${id}`
    }),
    queryFn: ({ signal }) =>
      CraftRouteAPI.getListForTree(
        {
          conditions: `UID = ${id}`
        },
        signal
      ),
    enabled: !!id
  })
