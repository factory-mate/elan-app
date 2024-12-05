import { DictsClassAPI } from './api'
import { fullListQK } from './query-keys'
import type { DictTypes } from './types'

export const fullListQO = (code: DictTypes) =>
  queryOptions({
    queryKey: fullListQK(code),
    queryFn: ({ signal }) => DictsClassAPI.fullList(code, signal)
  })
