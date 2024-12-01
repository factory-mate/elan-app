import type { Page, PageDto } from '@/features/pagination'

import type { CustomerAddDto, CustomerEditDto, CustomerTreeItemVo, CustomerVo } from './types'

export class CustomerAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/customer`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<CustomerTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<CustomerVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<CustomerVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: CustomerAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: CustomerEditDto) {
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
