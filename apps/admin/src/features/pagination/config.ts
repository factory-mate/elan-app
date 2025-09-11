const DEFAULT_PAGE_INDEX = 1
const DEFAULT_PAGE_SIZE = 20
const DEFAULT_PAGE_MIN_SIZE = 100
const DEFAULT_PAGE_MAX_SIZE = 99999

export const defaultPageDto = Object.freeze<PageDto>({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE
})

export const defaultMinPageDto = Object.freeze<PageDto>({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_MIN_SIZE
})

export const defaultMaxPageDto = Object.freeze<PageDto>({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_MAX_SIZE
})

export const defaultPageSizeOptions = [DEFAULT_PAGE_SIZE, 50, 100, 500]
