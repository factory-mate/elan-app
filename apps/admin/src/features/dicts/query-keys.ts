import type { DictTypeDto } from './types'

export const FULL_LIST_QK = 'dict:full-list'

export const TYPE_QK = 'dict:get-dic-type'

export const fullListQK = (code: string) => [FULL_LIST_QK, code] as const

export const typeQK = (data: DictTypeDto) => [TYPE_QK, data] as const
