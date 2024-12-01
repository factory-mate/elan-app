import type { PageDto } from '@/features/pagination'

export const TREE_QK = 'customer-class:tree'

export const LIST_QK = 'customer-class:list'

export const DETAIL_QK = 'customer-class:detail'

export const treeQK = () => [TREE_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
