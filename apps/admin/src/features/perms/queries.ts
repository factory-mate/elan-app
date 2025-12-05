import { PermAPI } from './api'
import { codeListQK, treeQK, userPermCodesQK } from './query-keys'

export const treeQO = () =>
  queryOptions({
    queryKey: treeQK(),
    queryFn: () => PermAPI.getPermsTree()
  })

export const codeListQO = (params: FullPageDto) =>
  queryOptions({
    queryKey: codeListQK(params),
    queryFn: () => PermAPI.getPermsByRoleCode(params)
  })

export const userPermCodesQO = () =>
  queryOptions({
    queryKey: userPermCodesQK(),
    queryFn: () => PermAPI.getPermsByUser()
  })
