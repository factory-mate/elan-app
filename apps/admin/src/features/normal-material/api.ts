import type { NormalMaterialVo } from './types'

export class NormalMaterialAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/mes_bom`

  static async list(data: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<NormalMaterialVo>>(`${this.apiPrefix}/getReportNormal`, data, {
      signal
    })
  }
}
