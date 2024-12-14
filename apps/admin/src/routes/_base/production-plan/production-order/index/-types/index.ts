import type { Dayjs } from 'dayjs'

export interface FilterForm {
  cVouchTypeName?: string
  iStatus?: number
  cCode?: string
  dBeginTime?: [Dayjs, Dayjs]
  cInvCode?: string
}
