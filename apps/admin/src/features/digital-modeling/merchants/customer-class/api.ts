import type { Page, PageDto } from '@/features/pagination'

import type {
  CustomerClassAddDto,
  CustomerClassEditDto,
  CustomerClassTreeItemVo,
  CustomerClassVo
} from './types'

export class CustomerClassAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/customerclass`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<CustomerClassTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<CustomerClassVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<CustomerClassVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: CustomerClassAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: CustomerClassEditDto) {
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
