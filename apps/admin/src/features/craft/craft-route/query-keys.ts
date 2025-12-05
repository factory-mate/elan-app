export const FULL_LIST_QK = 'craft-routes:full-list'

export const LIST_QK = 'craft-routes:list'

export const DETAIL_QK = 'craft-routes:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
