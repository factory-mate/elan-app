export const LIST_QK = 'production-order:list'

export const DETAIL_QK = 'production-order:detail'

export const DETAIL_BODYS_QK = 'production-order:detail-bodys'

export const BOM_LIST_QK = 'production-order:bom-list'

export const PRINT_DETAIL_QK = 'production-order:print-detail'

export const listQK = (params: PageDto) => [LIST_QK, params] as const

export const detailQK = (id: string) => [DETAIL_QK, id] as const

export const detailBodysQK = (id: string) => [DETAIL_BODYS_QK, id] as const

export const bomListQK = (id: string) => [BOM_LIST_QK, id] as const

export const printDetailQK = (id: string) => [PRINT_DETAIL_QK, id] as const
