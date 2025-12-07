export const FULL_LIST_QK = 'main-production-plan-mps:full-list'

export const LIST_QK = 'main-production-plan-mps:list'

export const DETAIL_QK = 'main-production-plan-mps:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
