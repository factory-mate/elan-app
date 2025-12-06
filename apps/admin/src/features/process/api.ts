import type { ProcessAddDto, ProcessEditDto, ProcessVo } from './types'

export class ProcessAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<ProcessVo[]>(`${this.apiPrefix}/mes_process/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<ProcessVo>>(`${this.apiPrefix}/mes_process/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<ProcessVo>(`${this.apiPrefix}/mes_process/GetById`, { val }, { signal })
  }

  static async add(data: ProcessAddDto) {
    return httpClient.post(`${this.apiPrefix}/mes_process/Add`, data)
  }

  static async edit(data: ProcessEditDto) {
    return httpClient.post(`${this.apiPrefix}/mes_process/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/mes_process/Del`, { data: ids })
  }
}
