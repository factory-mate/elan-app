import type { StepAddDto, StepEditDto, StepVo } from './types'

export class StepAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<StepVo[]>(`${this.apiPrefix}/mes_step/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<StepVo>>(`${this.apiPrefix}/mes_step/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<StepVo>(`${this.apiPrefix}/mes_step/GetById`, { val }, { signal })
  }

  static async add(data: StepAddDto) {
    return httpClient.post(`${this.apiPrefix}/mes_step/Add`, data)
  }

  static async edit(data: StepEditDto) {
    return httpClient.post(`${this.apiPrefix}/mes_step/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/mes_step/Del`, { data: ids })
  }
}
