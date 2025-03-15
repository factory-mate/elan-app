export const FULL_LIST_QK = 'unit:full-list'

export const LIST_QK = 'unit:list'

export const DETAIL_QK = 'unit:detail'

export const fullListQK = (params: FullPageDto) => [FULL_LIST_QK, params] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
