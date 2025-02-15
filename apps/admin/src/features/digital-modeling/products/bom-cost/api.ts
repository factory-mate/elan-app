import type { BOMCostDto, BOMCostVo } from './types'

export class BOMCostAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/mes_bom`

  static async getCost(data: BOMCostDto, signal?: AbortSignal) {
    return httpClient.post<BOMCostVo[]>(`${this.apiPrefix}/GetCost`, data, { signal })
  }
}
