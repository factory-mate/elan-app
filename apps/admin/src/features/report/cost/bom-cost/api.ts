import type { AxiosResponse } from 'axios'

import type { BOMCostDto, BOMCostVo } from './types'

export class BOMCostAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/mes_bom`

  static async getCost(data: BOMCostDto, signal?: AbortSignal) {
    return httpClient.post<BOMCostVo[]>(`${this.apiPrefix}/GetCost`, data, { signal })
  }

  static async export(data: BOMCostDto) {
    return httpClient.post<AxiosResponse<BlobPart>>(`${this.apiPrefix}/ExportBOMCost`, data, {
      responseType: 'blob'
    })
  }
}
