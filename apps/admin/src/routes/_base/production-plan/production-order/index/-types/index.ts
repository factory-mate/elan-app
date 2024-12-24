import type { Dayjs } from 'dayjs'

export interface FilterForm {
  cVouchType?: string
  iStatus?: number
  cCode?: string
  dBeginTime?: [Dayjs, Dayjs]
  cInvCode?: string
}
