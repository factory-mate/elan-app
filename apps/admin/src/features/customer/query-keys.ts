export const LIST_QK = 'customer:list'

export const DETAIL_QK = 'customer:detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
