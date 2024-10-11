import type { PageParams } from '../pagination'
import type { LowCodePageQueryConfig } from './types'

export const LOW_CODE_CONFIG_QK = 'config'

export const LOW_CODE_PAGE_QUERY_QK = 'page:query'

export const lowCodeConfigQK = (modelCode: string) => [LOW_CODE_CONFIG_QK, modelCode] as const

export const lowCodePageQueryQK = (config: LowCodePageQueryConfig, params: PageParams) =>
  [LOW_CODE_PAGE_QUERY_QK, config, params] as const
