import type { AuthListDto } from './types'

export const FULL_LIST_QK = 'policy:full-list'

export const LIST_QK = 'policy:list'

export const DETAIL_QK = 'policy:detail'

export const DETAIL_LIST_QK = 'policy:detail-list'

export const AUTH_LIST_QK = 'policy:auth-list'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const

export const detailListQK = (id: string) => [DETAIL_LIST_QK, id] as const

export const authListQK = (params: AuthListDto) => [AUTH_LIST_QK, params] as const
