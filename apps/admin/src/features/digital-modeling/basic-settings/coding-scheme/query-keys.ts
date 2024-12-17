import type { PageDto } from '@/features/pagination'

export const LIST_QK = 'coding-scheme:list'

export const DETAIL_QK = 'coding-scheme:detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
