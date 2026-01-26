import type { BOMChangeReplaceDto, BOMChangeVo } from './types'

export class BOMChangeAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/mes_bom`

  static async list(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.post<BOMChangeVo[]>(`${this.apiPrefix}/GetBodysByModel`, params, {
      signal
    })
  }

  static async replace(data: BOMChangeReplaceDto) {
    return httpClient.post(`${this.apiPrefix}/Update`, data)
  }
}
