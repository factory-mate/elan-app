import type { Page, PageDto } from '@/features/pagination'

import type {
  EmployeeAddDto,
  EmployeeEditDto,
  EmployeeSetFreezeStatusDto,
  EmployeeUpdateDeptDto,
  EmployeeVo
} from './types'

export class EmployeeAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/employee`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<EmployeeVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<EmployeeVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: EmployeeAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: EmployeeEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async changeParent(data: EmployeeUpdateDeptDto) {
    return httpClient.post(`${this.apiPrefix}/ChangeParent`, data)
  }

  static async setFreezeStatus(data: EmployeeSetFreezeStatusDto) {
    return httpClient.post(`${this.apiPrefix}/SetFreezeStatus`, data)
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
