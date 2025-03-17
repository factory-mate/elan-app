export const FULL_LIST_QK = 'roles:full-list'

export const LIST_QK = 'roles:list'

export const DETAIL_QK = 'roles:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
