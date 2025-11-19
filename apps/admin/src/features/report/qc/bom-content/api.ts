import type { AxiosResponse } from 'axios'

import type { BOMContentDto, BomContentVo } from './types'

export class BOMContentAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/mes_bom`

  static async list(params: BOMContentDto, signal?: AbortSignal) {
    return httpClient.post<Page<BomContentVo>>(
      `${this.apiPrefix}/getReportMaterial`,
      {},
      {
        params,
        signal
      }
    )
  }

  static async export(params: BOMContentDto) {
    return httpClient.post<AxiosResponse<BlobPart>>(
      `${this.apiPrefix}/ExportReportMaterial`,
      {},
      {
        responseType: 'blob',
        params
      }
    )
  }
}
