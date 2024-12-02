import type { PageDto } from '@/features/pagination'

export const TREE_QK = 'department:tree'

export const LIST_QK = 'department:list'

export const DETAIL_QK = 'department:detail'

export const treeQK = () => [TREE_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const