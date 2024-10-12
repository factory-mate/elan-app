export interface PageParams {
  pageIndex: number
  pageSize: number
  conditions?: string
  orderByFileds?: string
}

export interface PageResponse<T = any> {
  data: T[]
  dataCount: number
  pageCount: number
  pageIndex: number
  pageSize: number
}
