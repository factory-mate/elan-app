import type { FullPageDto, PageDto } from '@/features/pagination'

export const FULL_LIST_QK = 'unit-class:full-list'

export const LIST_QK = 'unit-class:list'

export const DETAIL_QK = 'unit-class:detail'

export const fullListQK = (params: FullPageDto) => [FULL_LIST_QK, params] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
