import type { AxiosResponse } from 'axios'

import type { AllMaterialVo } from './types'

export class AllMaterialAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/mes_bom`

  static async list(data: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<AllMaterialVo>>(`${this.apiPrefix}/getReportAllMaterial`, data, {
      signal
    })
  }

  static async export(data: FullPageDto) {
    return httpClient.post<AxiosResponse<BlobPart>>(
      `${this.apiPrefix}/ExportReportAllMaterial`,
      data,
      {
        responseType: 'blob'
      }
    )
  }
}
