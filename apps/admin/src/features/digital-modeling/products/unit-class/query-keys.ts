import type { PageDto } from '@/features/pagination'

export const LIST_QK = 'unit-class:list'

export const FULL_LIST_QK = 'unit-class:full-list'

export const DETAIL_QK = 'unit-class:detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const fullListQK = () => [FULL_LIST_QK] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
