export const LIST_QK = 'pur-plan:list'

export const DETAIL_QK = 'pur-plan:detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
