import type { FullPageDto, PageDto } from '@/features/pagination'

export const TREE_QK = 'bom:tree'

export const FULL_LIST_QK = 'bom:full-list'

export const LIST_QK = 'bom:list'

export const DETAIL_QK = 'bom:detail'

export const CHILD_LIST_QK = 'bom:child-list'

export const treeQK = () => [TREE_QK] as const

export const fullListQK = (params: FullPageDto) => [FULL_LIST_QK, params] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const

export const childListQK = (id: string) => [CHILD_LIST_QK, id] as const
