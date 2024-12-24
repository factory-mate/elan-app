import type { Page, PageDto } from '@/features/pagination'

import type { WarehouseAddDto, WarehouseEditDto, WarehouseVo } from './types'

export class WarehouseAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/warehouse`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<WarehouseVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<WarehouseVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: WarehouseAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: WarehouseEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
