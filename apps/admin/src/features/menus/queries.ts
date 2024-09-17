import { STALE } from '@/shared/query-client'

import { MenusAPI } from './api'
import { menusQK } from './query-keys'
import { flattenMenus } from './utils'

export const menusQO = () =>
  queryOptions({
    queryKey: menusQK(),
    queryFn: ({ signal }) => MenusAPI.getMenuAuth(signal),
    staleTime: STALE.INFINITY,
    select: (data) => flattenMenus(data)
  })
