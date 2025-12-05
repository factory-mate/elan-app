export const FULL_LIST_QK = 'employee:full-list'

export const LIST_QK = 'employee:list'

export const DETAIL_QK = 'employee:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
