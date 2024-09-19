import { STALE } from '@/shared/query-client'

import { MenusAPI } from './api'
import { menusQK } from './query-keys'

export const menusQO = () =>
  queryOptions({
    queryKey: menusQK(),
    queryFn: ({ signal }) => MenusAPI.getMenuAuth(signal),
    staleTime: STALE.INFINITY
  })
