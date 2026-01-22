import type { Dayjs } from 'dayjs'

export interface FilterForm {
  cCode?: string
  dDate?: [Dayjs, Dayjs]
  cCusCode?: string
  cCusName?: string
}
