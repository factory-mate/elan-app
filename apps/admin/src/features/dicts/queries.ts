import { DictsClassAPI } from './api'
import { fullListQK, typeQK } from './query-keys'
import type { DictTypeDto, DictTypes } from './types'

export const fullListQO = (code: DictTypes) =>
  queryOptions({
    queryKey: fullListQK(code),
    queryFn: ({ signal }) => DictsClassAPI.fullList(code, signal)
  })

export const dicTypeQO = (data: DictTypeDto) =>
  queryOptions({
    queryKey: typeQK(data),
    queryFn: ({ signal }) => DictsClassAPI.dictType(data, signal)
  })
