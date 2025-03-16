import { PermAPI } from './api'
import { codeListQK, treeQK } from './query-keys'

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
