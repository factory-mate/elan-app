export const FULL_LIST_QK = 'menus:full-list'

export const LIST_QK = 'menus:list'

export const DETAIL_QK = 'menus:detail'

export const fullListQK = () => [FULL_LIST_QK] as const

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const
