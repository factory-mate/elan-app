import type { FullPageDto, Page, PageDto } from '@/features/pagination'

import type { BOMAddDto, BOMChildItemVo, BOMEditDto, BOMTreeItemVo, BOMVo } from './types'

export class BOMAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/mes_bom`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<BOMTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async fullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.get<BOMVo[]>(`${this.apiPrefix}/GetForList`, params, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<BOMVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<BOMVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async getBodys(val: string, signal?: AbortSignal) {
    return httpClient.get<BOMChildItemVo[]>(`${this.apiPrefix}/GetBodys`, { val }, { signal })
  }

  static async add(data: BOMAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: BOMEditDto) {
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
