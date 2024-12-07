import type { PageDto } from '@/features/pagination'

export const LIST_QK = 'unit:list'

export const DETAIL_QK = 'unit:detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
