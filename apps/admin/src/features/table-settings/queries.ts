import { TableSettingAPI } from './api'
import { fullListQK } from './query-keys'

export const fullListQO = () =>
  queryOptions({
    queryKey: fullListQK(),
    queryFn: ({ signal }) => TableSettingAPI.fullList(signal),
    placeholderData: keepPreviousData
  })
