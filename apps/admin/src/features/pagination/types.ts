export interface Page<T = any> {
  data: T[]
  pageIndex: number
  pageSize: number
  pageCount: number
  dataCount: number
}

export interface PageDto {
  pageIndex: number
  pageSize: number
  conditions?: string
  orderByFileds?: string
}
