import type { Page, PageDto } from '@/features/pagination'

import type { SupplierAddDto, SupplierEditDto, SupplierTreeItemVo, SupplierVo } from './types'

export class SupplierAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/supplier`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<SupplierTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<SupplierVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<SupplierVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: SupplierAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: SupplierEditDto) {
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
