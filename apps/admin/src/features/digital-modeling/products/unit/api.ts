import type { FullPageDto, Page, PageDto } from '@/features/pagination'

import type { UnitAddDto, UnitEditDto, UnitVo } from './types'

export class UnitAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/unit`

  static async fullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.get<UnitVo[]>(`${this.apiPrefix}/GetForList`, params, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<UnitVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<UnitVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: UnitAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: UnitEditDto) {
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
