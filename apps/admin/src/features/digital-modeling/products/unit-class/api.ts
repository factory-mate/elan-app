import type { FullPageDto, Page, PageDto } from '@/features/pagination'

import type { UnitClassAddDto, UnitClassEditDto, UnitClassTreeItemVo, UnitClassVo } from './types'

export class UnitClassAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/unitclass`

  static async fullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.get<UnitClassTreeItemVo[]>(`${this.apiPrefix}/GetForList`, params, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<UnitClassVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<UnitClassVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: UnitClassAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: UnitClassEditDto) {
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
