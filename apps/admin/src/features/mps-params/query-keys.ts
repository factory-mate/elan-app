export const FULL_LIST_QK = 'mps-params:full-list'

export const DETAIL_QK = 'mps-params:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
