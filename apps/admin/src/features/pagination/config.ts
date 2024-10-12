import type { PageParams } from './types'

const DEFAULT_PAGE_INDEX = 1
const DEFAULT_PAGE_SIZE = 1

export const defaultPageParams: PageParams = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE
}

export const defaultPageSizeOptions = [1, 10, 20, 50, 100]
