import type { FullPageDto, Page, PageDto } from '@/features/pagination'

import type {
  InventoryClassAddDto,
  InventoryClassEditDto,
  InventoryClassTreeItemVo,
  InventoryClassVo
} from './types'

export class InventoryClassAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/inventoryclass`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<InventoryClassTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async fullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.get<InventoryClassVo[]>(`${this.apiPrefix}/GetForList`, params, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<InventoryClassVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<InventoryClassVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: InventoryClassAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: InventoryClassEditDto) {
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
