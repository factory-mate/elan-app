import type { Page, PageDto } from '@/features/pagination'

import type {
  SupplierClassAddDto,
  SupplierClassEditDto,
  SupplierClassTreeItemVo,
  SupplierClassVo
} from './types'

export class SupplierClassAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/supplierclass`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<SupplierClassTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<SupplierClassVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<SupplierClassVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: SupplierClassAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: SupplierClassEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async start(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Start`, ids)
  }

  static async stop(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Stop`, ids)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
