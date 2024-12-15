import type { PageDto } from '@/features/pagination'

export const LIST_QK = 'production-order:list'

export const DETAIL_QK = 'production-order:detail'

export const DETAIL_BODYS_QK = 'production-order:detail-bodys'

export const DETAIL_BODYSS_QK = 'production-order:detail-bodyss'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const

export const detailBodysQK = (id: string) => [DETAIL_BODYS_QK, id] as const

export const detailBodyssQK = (id: string) => [DETAIL_BODYSS_QK, id] as const
