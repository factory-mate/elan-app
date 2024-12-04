import type { PageDto } from '@/features/pagination'

export const TREE_QK = 'inventory-class:tree'

export const LIST_QK = 'inventory-class:list'

export const DETAIL_QK = 'inventory-class:detail'

export const treeQK = () => [TREE_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const