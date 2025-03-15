export const LIST_QK = 'sales-order:list'

export const listQK = (params: PageDto) => [LIST_QK, params] as const
