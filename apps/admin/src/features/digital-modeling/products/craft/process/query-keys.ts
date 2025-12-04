export const FULL_LIST_QK = 'processes:full-list'

export const LIST_QK = 'processes:list'

export const DETAIL_QK = 'processes:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
