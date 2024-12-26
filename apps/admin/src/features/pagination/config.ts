import type { PageDto } from './types'

const DEFAULT_PAGE_INDEX = 1
const DEFAULT_PAGE_SIZE = 20
const DEFAULT_PAGE_MAX_SIZE = 9999

export const defaultPageDto = Object.freeze<PageDto>({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE
})

export const defaultMaxPageDto = Object.freeze<PageDto>({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_MAX_SIZE
})

export const defaultPageSizeOptions = [DEFAULT_PAGE_SIZE, 50, 100]
