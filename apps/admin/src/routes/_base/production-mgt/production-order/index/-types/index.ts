import type { Dayjs } from 'dayjs'

export interface FilterForm {
  cStandardType?: string
  cVouchType?: string
  iStatus?: number
  cCode?: string
  dBeginTime?: [Dayjs, Dayjs]
  cInvCode?: string
}
