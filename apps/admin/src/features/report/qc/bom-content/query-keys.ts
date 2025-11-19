import type { BOMContentDto } from './types'

export const LIST_QK = 'bom-content:list'

export const listQK = (params: BOMContentDto) => [LIST_QK, params] as const
