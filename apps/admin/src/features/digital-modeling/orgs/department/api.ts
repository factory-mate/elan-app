import type { FullPageDto, Page, PageDto } from '@/features/pagination'

import type {
  DepartmentAddDto,
  DepartmentEditDto,
  DepartmentTreeItemVo,
  DepartmentVo
} from './types'

export class DepartmentAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/department`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<DepartmentTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async fullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.post<DepartmentVo[]>(`${this.apiPrefix}/GetForList`, params, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<DepartmentVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<DepartmentVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: DepartmentAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: DepartmentEditDto) {
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
