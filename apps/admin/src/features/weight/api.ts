import type { WeightAddDto, WeightEditDto, WeightVo } from './types'

export class WeightAPI {
  private static apiPrefix = MES_SERVICE_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<WeightVo[]>(`${this.apiPrefix}/weight_setting/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<WeightVo>>(`${this.apiPrefix}/weight_setting/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<WeightVo>(`${this.apiPrefix}/weight_setting/GetById`, { val }, { signal })
  }

  static async add(data: WeightAddDto) {
    return httpClient.post(`${this.apiPrefix}/weight_setting/Add`, data)
  }

  static async edit(data: WeightEditDto) {
    return httpClient.post(`${this.apiPrefix}/weight_setting/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/weight_setting/Del`, { data: ids })
  }
}
