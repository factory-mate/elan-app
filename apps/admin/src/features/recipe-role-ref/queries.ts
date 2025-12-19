import { RecipeRoleRefAPI } from './api'
import { detailQK, fullListQK, listQK } from './query-keys'

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => RecipeRoleRefAPI.fullList(signal),
    placeholderData: keepPreviousData
  })

export const listQO = (params: PageDto) =>
  queryOptions({
    queryKey: listQK(params),
    queryFn: ({ signal }) => RecipeRoleRefAPI.list(params, signal),
    placeholderData: keepPreviousData
  })

export const detailQO = (id?: string) =>
  queryOptions({
    queryKey: detailQK(id!),
    queryFn: ({ signal }) => RecipeRoleRefAPI.detail(id!, signal),
    enabled: !!id
  })
