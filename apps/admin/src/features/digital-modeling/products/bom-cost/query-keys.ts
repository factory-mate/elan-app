import type { BOMCostDto } from './types'

export const LIST_QK = 'bom-cost:list'

export const listQK = (params: BOMCostDto) => [LIST_QK, params] as const
