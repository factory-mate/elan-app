import type { Dayjs } from 'dayjs'

export interface FilterForm {
  dBeginTime?: [Dayjs, Dayjs]
  cCode?: string
  cInvCode?: string
}
