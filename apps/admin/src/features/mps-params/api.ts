import type { MpsParamsEditDto, MpsParamsVo } from './types'

export class MpsParamsAPI {
  private static apiPrefix = MES_SERVICE_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<MpsParamsVo[]>(`${this.apiPrefix}/PLANSETTING/GetForList`, {}, { signal })
  }

  static async edit(data: MpsParamsEditDto) {
    return httpClient.post(`${this.apiPrefix}/PLANSETTING/Edit`, data)
  }
}
