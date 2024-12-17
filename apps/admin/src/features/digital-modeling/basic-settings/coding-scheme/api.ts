import type { Page, PageDto } from '@/features/pagination'

import type { CodingSchemeAddDto, CodingSchemeEditDto, CodingSchemeVo } from './types'

export class CodingSchemeAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/SYS_GradeRule`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<CodingSchemeVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<CodingSchemeVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: CodingSchemeAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: CodingSchemeEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
