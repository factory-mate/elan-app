import type { PageDto } from '@/features/pagination'

export const LIST_QK = 'unit:list'

export const listQK = (params: PageDto) => [LIST_QK, params] as const
