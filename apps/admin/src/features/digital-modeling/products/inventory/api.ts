import type { FullPageDto, Page, PageDto } from '@/features/pagination'

import type { InventoryAddDto, InventoryDetailVo, InventoryEditDto, InventoryVo } from './types'

export class InventoryAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/inventory`

  static async fullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.get<InventoryVo[]>(`${this.apiPrefix}/GetForList`, params, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<InventoryVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(cInvCode: string, signal?: AbortSignal) {
    return httpClient.get<InventoryDetailVo>(
      `${this.apiPrefix}/GetByCode`,
      { cInvCode },
      { signal }
    )
  }

  static async add(data: InventoryAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: InventoryEditDto) {
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
