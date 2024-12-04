import type { PageDto } from '@/features/pagination'

export const LIST_QK = 'inventory:list'

export const DETAIL_QK = 'inventory:detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
