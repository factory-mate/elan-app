export const LIST_QK = 'production-date-diff:list'

export const listQK = (params: PageDto) => [LIST_QK, params] as const
