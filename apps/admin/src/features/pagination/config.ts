import type { PageParams } from './types'

const DEFAULT_PAGE_INDEX = 1
const DEFAULT_PAGE_SIZE = 20

export const defaultPageParams: PageParams = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE
}
