import type { AxiosResponse } from 'axios'

import type { ListVo } from './types'

export class ProductionMaterialAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/PRODUCT_VOUCH`

  static async getList(data: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<ListVo>>(`${this.apiPrefix}/GetBOMDetail`, data, { signal })
  }

  static async export(data: PageDto) {
    return httpClient.post<AxiosResponse<BlobPart>>(`${this.apiPrefix}/ExportBOMDetail`, data, {
      responseType: 'blob'
    })
  }
}
