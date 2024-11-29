import type { PageDto } from './types'

const DEFAULT_PAGE_INDEX = 1
const DEFAULT_PAGE_SIZE = 20

export const defaultPageDto: PageDto = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE
}

export const defaultPageSizeOptions = [DEFAULT_PAGE_SIZE, 50, 100]
